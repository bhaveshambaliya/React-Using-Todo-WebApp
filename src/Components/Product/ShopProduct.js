import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { default as usersolid } from "../Asset/Images/user-solid.svg";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";

export default function ShopProduct(props) {
  const { currentUser, AddProducts, RemoveProduct } = useAuth();
  const [shopcart, setshopcart] = useState([]);
  const [isdata, setIsdata] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (currentUser != null && AddProducts != null) {
      db.collection("PurchaseProduct")
        .where("currentUserUid", "==", currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            //debugger;
            db.collection("products")
              .doc(doc.data().productuid)
              .get()
              .then((GetData) => {
                //debugger;
                //console.log(GetData);
                // setshopcart([
                //   {
                //     product: GetData.data(),
                //     totalItem: doc.data().totalItem,
                //   },
                // ]);
                let obj = {
                  id: doc.id,
                  product: GetData.data(),
                  totalItem: doc.data().totalItem,
                };
                setshopcart((result) => [...result, obj]);
              });
          });
        });
    }
  }, [currentUser]);

  console.log(" Shop carts data :" + JSON.stringify(shopcart));

  return (
    <>
      <div className="countiner p-3">
        <div className="row justify-content-center">
          <div className="section-title">
            <span> Shoppping Cart </span>
            <h2 className="text-center"> Shoppping Cart </h2>
          </div>

          <div className="col-md-6 justify-content-center">
            {shopcart.map((data, index) => {
              if (data.product != null) {
                return (
                  <>
                    <div className="card-deck" key={index}>
                      <div className="card" key={index}>
                        {data.product && (
                          <div className="card-header">{data.product.Name}</div>
                        )}
                        {data.product && data.product.UploadImage ? (
                          <img
                            src={data.product.UploadImage}
                            className="card-img-top"
                            alt={data.Name}
                            width="20px"
                            height="150px"
                          />
                        ) : (
                          <img
                            src={usersolid}
                            className="card-img-top"
                            alt={data.product && data.product.Name}
                            width="20px"
                            height="150px"
                          />
                        )}
                        <div className="card-body">
                          {data.product && (
                            <>
                              <h5 className="card-title">
                                {data.product.Name}
                              </h5>
                              <p className="card-text">
                                {data.product.Description}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="card-footer">
                          <div className="d-flex align-items-center justify-content-around">
                            <h6>
                              <b>
                                <i className="fas fa-rupee-sign"></i>
                                {data.product && data.product.Price}
                              </b>
                            </h6>
                            <h6>
                              <b> Quantity : {data && data.totalItem}</b> &nbsp;
                              <button
                                type="button"
                                class="btn btn-success btn-sm ml-1 mr-1"
                                disabled={data.totalItem >= 1 ? false : true}
                                onClick={(event) =>
                                  db
                                    .collection("PurchaseProduct")
                                    .doc(data.id)
                                    .update({
                                      totalItem: data.totalItem + 1,
                                    })
                                    .then(() => {
                                      debugger;
                                      let GetIndex = shopcart.findIndex(
                                        (x) => x.id == data.id
                                      );
                                      shopcart[GetIndex].totalItem =
                                        data.totalItem + 1;
                                      if (GetIndex != null) {
                                        setshopcart([...shopcart, shopcart]);
                                      }
                                    })
                                }
                              >
                                <i class="fas fa-plus"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-success btn-sm ml-1 mr-1"
                                disabled={data.totalItem > 1 ? false : true}
                                onClick={(event) =>
                                  db
                                    .collection("PurchaseProduct")
                                    .doc(data.id)
                                    .update({
                                      totalItem: data.totalItem - 1,
                                    })
                                    .then(() => {
                                      debugger;
                                      let GetIndex = shopcart.findIndex(
                                        (x) => x.id == data.id
                                      );
                                      shopcart[GetIndex].totalItem =
                                        data.totalItem - 1;
                                      if (GetIndex != null) {
                                        setshopcart([...shopcart, shopcart]);
                                      }
                                    })
                                }
                              >
                                <i class="fas fa-minus"></i>
                              </button>
                            </h6>
                            <h6>
                              <b>
                                Total Price :
                                {data.product &&
                                  data.product.Price * data.totalItem}
                              </b>
                            </h6>
                            <button
                              type="button"
                              class="btn btn-danger btn-sm"
                              disabled={
                                data.product.Quantity == 0 ? true : false
                              }
                              onClick={(event) =>
                                db
                                  .collection("PurchaseProduct")
                                  .doc(data.id)
                                  .delete()
                                  .then(
                                    setshopcart([
                                      ...shopcart.filter(
                                        (x) => x.id !== data.id
                                      ),
                                    ]),
                                    RemoveProduct()
                                  )
                              }
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                            {/* <p>{data.id}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>

          {/* <div className="col-md-6"> Total amount : {TotalAmount}</div> */}
        </div>
      </div>
    </>
  );
}
