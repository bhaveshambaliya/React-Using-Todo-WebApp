import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { db, auth, storage } from "../firebase";
import { useAuth } from "./Contexts/AuthContext";
import { toast } from "react-toastify";
import { default as usersolid } from "../Components/Asset/Images/user-solid.svg";
import "../Components/User/Profile.css";
import { sendEmailVerification } from "firebase/auth";

export default function Register() {
  const history = useHistory();
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Mobile, setMobile] = useState("");
  const [AlternetMobile, setAlternetMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Aadhaar, setAadhaar] = useState("");
  const { signup } = useAuth();
  const [imageAsFile, setImageAsFile] = useState("");

  const handleImageAsFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const inputNameRef = useRef();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const register = (e) => {
    e.preventDefault();

    signup(Email, Password)
      .then((userCredential) => {
        // Signed in Succesfully
        if (userCredential) {
          const user = userCredential.user;

          db.collection("users")
            .add({
              Uid: user.uid,
              Name: Name,
              Address: Address,
              Mobile: Mobile,
              AlternetMobile: AlternetMobile,
              Email: Email,
              Password: Password,
              Aadhaar: Aadhaar,
            })
            .then((res) => {
              const uploadTask = storage
                .ref(`/images/${imageAsFile.name}`)
                .put(imageAsFile);
              //initiates the firebase side uploading
              uploadTask.on(
                "state_changed",
                (snapShot) => {
                  //takes a snap shot of the process as it is happening
                  console.log(snapShot);
                },
                (err) => {
                  //catches the errors
                  console.log(err);
                },
                () => {
                  // gets the functions from storage refences the image storage in firebase by the children
                  // gets the download url then sets the image from firebase as the value for the imgUrl key:
                  storage
                    .ref("images")
                    .child("/" + imageAsFile.name)
                    .getDownloadURL()
                    .then((fireBaseUrl) => {
                      if (fireBaseUrl != "") {
                        db.collection("users").doc(res.id).update({
                          UploadImage: fireBaseUrl,
                        });
                      }
                    });
                }
              );
              // db.collection("users")
              //   .where("Uid", "==", user.uid)
              //   .onSnapshot((snapshot) => {
              //     snapshot.docs.map((doc) => setaddUserUid(doc.id));
              //   });
            });

          setName("");
          setAddress("");
          setMobile("");
          setAlternetMobile("");
          setEmail("");
          setPassword("");
          setAadhaar("");
          toast.success("User Register Successfully");

          history.push("/login");
          // ...
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        toast.error(" Error while User is Register : " + errorMessage);
      });
  };

  return (
    <>
      <div className="countiner p-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 ml-5 mr-5">
            <div className="section-title">
              <span>Register</span>
              <h2 className="text-center"> Register </h2>
            </div>
            <form className="shadow p-4 mt-2">
              <div className="form-group">
                <div className="input-group mb-3 mt-3 justify-content-center">
                  <img
                    src={
                      imageAsFile ? URL.createObjectURL(imageAsFile) : usersolid
                    }
                    alt="image tag"
                    width="150px"
                    height="60px"
                    className="img-thumbnail"
                  />
                  <span class="custom-file-control form-control-file"></span>
                </div>
                <label htmlFor="UploadImage"> Upload Image </label>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <div class="input-group-append">
                      <span class="input-group-text" id="inputGroupFileAddon">
                        Upload
                      </span>
                    </div>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="UploadImage"
                      accept="image/*"
                      onChange={handleImageAsFile}
                    />
                    <label className="custom-file-label" htmlFor="UploadImage">
                      {imageAsFile ? imageAsFile.name : "Choose file"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Name"> Full Name </label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  ref={inputNameRef}
                  aria-describedby="NameHelp"
                  placeholder=""
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="Address"> Address </label>
                <textarea
                  className="form-control"
                  id="Address"
                  rows="3"
                  placeholder=""
                  value={Address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="Aadhaar"> Aadhaar </label>
                <input
                  type="number"
                  className="form-control"
                  id="Aadhaar"
                  aria-describedby="AadhaarHelp"
                  placeholder=""
                  min="0"
                  max="99999"
                  maxlength="5"
                  value={Aadhaar}
                  onChange={(e) => {
                    setAadhaar(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Mobile"> Mobile </label>
                <input
                  type="number"
                  className="form-control"
                  id="Mobile"
                  aria-describedby="MobileHelp"
                  placeholder=""
                  value={Mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="AlternetMobile"> Alternet Mobile </label>
                <input
                  type="number"
                  className="form-control"
                  id="AlternetMobile"
                  aria-describedby="mobileHelp"
                  placeholder=""
                  value={AlternetMobile}
                  onChange={(e) => {
                    setAlternetMobile(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Email"> Email Address </label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  placeholder=""
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  aria-autocomplete="false"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Password"> Password </label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  aria-describedby="PasswordHelp"
                  placeholder=""
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button
                disabled={
                  (!Name, !Email, !Password, !Address, !Mobile, !Aadhaar)
                }
                type="submit"
                className="btn btn-primary w-100 my-3"
                onClick={register}
              >
                Submit
              </button>

              <div className="d-flex justify-content-center links">
                Already have account? &nbsp;<a href="/login"> Sign in</a>
              </div>
            </form>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
}
