import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../Contexts/AuthContext";
import DataTable from "react-data-table-component";
import { default as usersolid } from "../Asset/Images/user-solid.svg";
import AddProduct from "./AddProduct";

export default function ProductList() {
  const { currentUser, AddNewProduct } = useAuth();
  const [ProductList, setProductList] = useState([]);
  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      setProductList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          product: doc.data(),
        }))
      );
    });
  }, []);

  //console.log(" CurrentUser : " + JSON.stringify(currentUser));
  //console.log(" Add Product  ID Datils : " + JSON.stringify(AddProducts));

  const columns = [
    {
      name: <h5></h5>,
      selector: (row) => row.UploadImage,
      cell: (row) =>
        row.UploadImage ? (
          <img
            height="84px"
            width="56px"
            alt={row.name}
            src={row.UploadImage}
          />
        ) : (
          <img height="84px" width="56px" alt={row.name} src={usersolid} />
        ),
    },
    {
      name: <h5>Name</h5>,
      selector: (row) => row.Name,
    },
    {
      name: <h5>Description</h5>,
      selector: (row) => row.Description,
    },
    {
      name: <h5>Price</h5>,
      selector: (row) => row.Price,
    },

    {
      name: <h5>Quantity</h5>,
      selector: (row) => row.Quantity,
    },
  ];
  return (
    <>
      <div className="countiner p-3">
        <div className="row justify-content-center">
          <div className="section-title">
            <span> Product List </span>
            <h2 className="text-center"> Product List </h2>
          </div>
          {/* <DataTable
            columns={columns}
            data={ProductList}
            pagination
            defaultSortFieldId={2}
            className="shadow"
          /> */}
          <div className="card-deck">
            {ProductList.map((data) => {
              return (
                <>
                  <div className="col-md-4 mt-4">
                    <div className="card" key={data.id}>
                      <div className="card-header">Header</div>
                      {data.product.UploadImage ? (
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
                          alt={data.product.Name}
                          width="20px"
                          height="150px"
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{data.product.Name}</h5>
                        <p className="card-text">{data.product.Description}</p>
                      </div>
                      <div className="card-footer d-flex justify-content-around">
                        <h6>
                          <b>
                            <i class="fas fa-rupee-sign"></i>
                            {data.product.Price}
                          </b>
                        </h6>
                        <h6>
                          <b> In stock : {data.product.Quantity}</b>
                        </h6>
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            type="button"
                            class="btn btn-primary btn-sm "
                            disabled={data.product.Quantity == 0 ? true : false}
                            onClick={() => AddNewProduct(data.id)}
                          >
                            <i class="fas fa-cart-plus"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger btn-sm ml-2"
                            onClick={() =>
                              db.collection("products").doc(data.id).delete()
                            }
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
