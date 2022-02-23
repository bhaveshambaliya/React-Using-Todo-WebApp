import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { db, auth, storage } from "../../firebase";
import { useAuth } from "../Contexts/AuthContext";
import "./Profile.css";
import { default as usersolid } from "../Asset/Images/user-solid.svg";
import { loading } from "../loading";

export default function Profile() {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Mobile, setMobile] = useState("");
  const [AlternetMobile, setAlternetMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Aadhaar, setAadhaar] = useState("");
  const [UserImage, setUserImage] = useState("");
  const [OldPassword, setOldPassword] = useState("");
  const [UserHoldRecoredUId, SetUserHoldRecoredUId] = useState("");
  const [userData, setuserData] = useState([]);
  const [isSet, setuser] = useState(false);
  const [imageAsFile, setImageAsFile] = useState("");

  const handleImageAsFile = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageAsFile((imageFile) => image);
    }
  };

  useEffect(() => {
    if (userData.length > 0 && !isSet) {
      SetUserHoldRecoredUId(userData[0].id);
      setName(userData[0].user.Name);
      setAddress(userData[0].user.Address);
      setMobile(userData[0].user.Mobile);
      setAlternetMobile(userData[0].user.AlternetMobile);
      setEmail(userData[0].user.Email);
      setPassword(userData[0].user.Password);
      setOldPassword(userData[0].user.Password);
      setAadhaar(userData[0].user.Aadhaar);
      setUserImage(userData[0].user.UploadImage);
      setuser(true);
    }
  }, [userData, isSet]);

  useEffect(() => {
    if (
      userData.length === 0 &&
      currentUser !== "undefined" &&
      currentUser !== null
    ) {
      db.collection("users")
        .where("Email", "==", currentUser.email)
        .onSnapshot((snapshot) => {
          setuserData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              user: doc.data(),
            }))
          );
        });
    }
  }, [userData, currentUser]);

  console.log("currentuser :" + JSON.stringify(currentUser));

  const UpdateProfile = (e) => {
    e.preventDefault();

    let EditUserInfo = {
      Uid: currentUser.uid,
      Name: Name,
      Address: Address,
      Mobile: Mobile,
      AlternetMobile: AlternetMobile,
      Email: Email,
      Password: Password,
      Aadhaar: Aadhaar,
      UploadImage: UserImage,
    };

    try {
      db.collection("users")
        .doc(UserHoldRecoredUId)
        .set(EditUserInfo)
        .then(() => {
          if (imageAsFile) {
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
                    db.collection("users")
                      .doc(UserHoldRecoredUId)
                      .update({ UploadImage: fireBaseUrl });
                  });
              }
            );
          }
        });
      toast.success("User Update Successfully");
      if (currentUser.email !== Email) {
        auth.currentUser.updateEmail(Email);
      }
      if (OldPassword !== Password) {
        auth.currentUser.updatePassword(Password);
      }

      if (currentUser.email != Email || OldPassword != Password) {
        //logout();
        history.push("/login");
      }
    } catch (error) {
      toast.error("Error while user is update. " + error);
    }
  };
  return !isSet ? (
    loading()
  ) : (
    <>
      <div className="countiner p-3">
        <div className="row justify-content-center ">
          <div className="col-md-6 ml-5 mr-5">
            <div className="section-title">
              <span>Profile</span>
              <h2 className="text-center"> Profile </h2>
            </div>
            <form className="shadow p-4 mt-2">
              <div className="form-group">
                <div className="input-group mb-3 mt-3 justify-content-center">
                  <img
                    src={
                      imageAsFile
                        ? URL.createObjectURL(imageAsFile)
                        : UserImage
                        ? UserImage
                        : usersolid
                    }
                    alt="image tag"
                    width="300px"
                    height="150px"
                    className="img-thumbnail Profile"
                  />
                  {/* <span className="img-thumbnail Profile">
                    <i class="fas fa-upload"></i>
                  </span> */}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="UploadImage"> </label>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="UploadProfileImage"
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
                type="submit"
                className="btn btn-primary w-100 my-3"
                onClick={UpdateProfile}
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
