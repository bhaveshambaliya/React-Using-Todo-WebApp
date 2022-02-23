import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { db, auth, storage } from "../../firebase";
import { toast } from "react-toastify";
import { default as usersolid } from "../Asset/Images/user-solid.svg";
import "../User/Profile.css";
import { useAuth } from "../Contexts/AuthContext";
import ProductList from "./ProductList";

export default function AddProduct() {
  const history = useHistory();
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [imageAsFile, setImageAsFile] = useState("");
  const { currentUser } = useAuth();

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

    db.collection("products")
      .add({
        Uid: currentUser.uid,
        Name: Name,
        Description: Description,
        Price: Price,
        Quantity: Quantity,
        UploadImage: "",
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
                if (!fireBaseUrl && !imageAsFile) {
                  db.collection("products").doc(res.id).update({
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
    setDescription("");
    setPrice("");
    setQuantity("");
    setImageAsFile("");
    toast.success("Product Add Successfully");

    //history.push("/login");
    // ...
  };

  return (
    <>
      <div className="countiner p-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 ml-5 mr-5">
            <div className="section-title">
              <span> Add Product</span>
              <h2 className="text-center"> Add Product </h2>
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
                <label htmlFor="Name"> Name </label>
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
                <label htmlFor="Description"> Description </label>
                <textarea
                  className="form-control"
                  id="Description"
                  rows="3"
                  placeholder=""
                  value={Description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="Quantity"> Quantity </label>
                <input
                  type="number"
                  className="form-control"
                  id="Quantity"
                  aria-describedby="QuantityHelp"
                  placeholder=""
                  value={Quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price"> Price </label>
                <input
                  type="number"
                  className="form-control"
                  id="Price"
                  aria-describedby="PriceHelp"
                  placeholder=""
                  value={Price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <button
                disabled={(!Name, !Description, !Price, !Quantity)}
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
