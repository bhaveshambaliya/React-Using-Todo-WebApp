import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../../firebase";
import firebase from "firebase/compat";
import DataTable from "react-data-table-component";

export const RentHome = () => {
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [payAmount, setpayAmount] = useState("");
  const [leftAmount, setleftAmount] = useState("");
  const { currentUser } = useAuth();
  const [rentData, setrentData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [search, setsearch] = useState("");
  const inputName = useRef();
  const Addmodelpopup = useRef();
  const [searchData, setsearchData] = useState([]);
  const [fromSearchDate, setfromSearchDate] = useState("");
  const [toSearchDate, settoSearchDate] = useState("");

  useEffect(() => {
    if (
      rentData.length === 0 &&
      currentUser != "undefined" &&
      currentUser != null
    ) {
      db.collection("rent")
        .where("uid", "==", currentUser.uid)
        .onSnapshot((snapshot) => {
          setrentData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              rentinfo: doc.data(),
            }))
          );
          setsearchData(snapshot.docs.map((doc) => ({
            id: doc.id,
            rentinfo: doc.data(),
          })));
        });
    }
  }, [rentData, currentUser]);

  console.log("rentData : " + JSON.stringify(rentData));
  console.log("searchData : " + JSON.stringify(searchData));

  const handelSubmitRent = (e) => {
    e.preventDefault();

    let rentData = {
      name: name,
      desc: desc,
      fromDate: fromDate,
      toDate: toDate,
      payAmount: payAmount,
      leftAmount: leftAmount,
      totalAmount: payAmount - leftAmount,
      uid: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (edit == true) {
      //console.log(edit);
      db.collection("rent").doc(editID).set(rentData);
      setEdit(false);
    } else {
      db.collection("rent").add(rentData);
    }

    setname("");
    setdesc("");
    setfromDate("");
    settoDate("");
    setpayAmount("");
    setleftAmount("");
  };

  const AddNewRent = () => {
    setname("");
    setdesc("");
    setfromDate("");
    settoDate("");
    setpayAmount("");
    setleftAmount("");
    setEdit(false);
  };

  const editData = (rentinfo, id) => {
    //Addmodelpopup.current.focus();
    setname(rentinfo.name);
    setdesc(rentinfo.desc);
    setfromDate(rentinfo.fromDate);
    settoDate(rentinfo.toDate);
    setpayAmount(rentinfo.payAmount);
    setleftAmount(rentinfo.leftAmount);
    setEditID(id);
    setEdit(true);
    inputName.current.focus();
  };
  const serach = (data) => {
    //debugger;
    setsearchData(
      rentData.filter((item) =>
        item.rentinfo.name.toLowerCase().includes(data.toLowerCase())
      )
    );
    setfromSearchDate("");
    settoSearchDate("");
    console.log("Filter  Serach Data :" + JSON.stringify(searchData));
  };

  const serachfromtodate = (fromDate, toDate) => {
    debugger
    if (fromDate != null && toDate != null) {
      setsearchData(
        rentData.filter(
          (item) =>
            (item.rentinfo.fromDate >= fromDate && item.rentinfo.toDate <= toDate)
        )
      );
      setsearch("");
    }
  };

  const columns = [
    // {
    //   name: <h5></h5>,
    //   selector: (row) => row.UploadImage,
    //   cell: (row) =>
    //     row.UploadImage ? (
    //       <img
    //         height="84px"
    //         width="56px"
    //         alt={row.name}
    //         src={row.UploadImage}
    //       />
    //     ) : (
    //       <img height="84px" width="56px" alt={row.name} src={usersolid} />
    //     ),
    // },
    {
      name: <h5>Name</h5>,
      selector: (row) => row.rentinfo.name,
      sortable: true,
      filterValue: search,
    },
    {
      name: <h5>Description</h5>,
      selector: (row) => row.rentinfo.desc,
    },
    {
      name: <h5>From Date</h5>,
      selector: (row) => row.rentinfo.fromDate,
      sortable: true,
    },

    {
      name: <h5>To Date</h5>,
      selector: (row) => row.rentinfo.toDate,
      sortable: true,
    },
    {
      name: <h5>Pay </h5>,
      selector: (row) => row.rentinfo.payAmount,
    },
    {
      name: <h5>Left</h5>,
      selector: (row) => row.rentinfo.leftAmount,
    },
    {
      name: <h5>Total</h5>,
      selector: (row) => row.rentinfo.payAmount - row.rentinfo.leftAmount,
    },
    {
      name: <h5> Edit </h5>,
      selector: (row) =>
        row.id && row.rentinfo ? (
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            className="btn btn-sm btn-success"
            onClick={(event) => editData(row.rentinfo, row.id)}
          >
            <i className="fas fa-edit p-0"></i>
          </button>
        ) : (
          ""
        ),
    },
    {
      name: <h5> Delete </h5>,
      //selector: (row) => row.rentinfo.leftAmount,
      selector: (row) =>
        row.id ? (
          <button
            type="button"
            className="btn btn-sm btn-danger "
            onClick={(event) => db.collection("rent").doc(row.id).delete()}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        ) : (
          ""
        ),
    },
  ];

  return (
    <>
      <div className="countiner p-3">
        <div className="row justify-content-center ">
          <div className="section-title">
            <span>Rent</span>
            <h2 className="text-center"> Rent </h2>
          </div>

          <div className="shadow col-md-11">
            <h5 className="text-center mt-2 p-3"> All Rent Information </h5>
            <div className="form-group row">
              <div className="form-gorup d-flex justify-content-between mr-2 ml-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={AddNewRent}
                >
                  <i class="fas fa-plus"></i>
                </button>

                <label htmlFor="exampleFormDateSelect1" className="form-label ml-5 mt-2">From Date</label>
                <input
                  type="date"
                  className="form-control col-md-2"
                  id="fromdate"
                  placeholder="From Date"
                  value={fromSearchDate}
                  onChange={(e) =>
                    setfromSearchDate(e.target.value) ||
                    serachfromtodate(e.target.value,toSearchDate)
                  }
                />

                <label htmlFor="exampleFormDateSelect1" className="form-label ml-3 mt-2">To Date</label>
                <input
                  type="date"
                  className="form-control col-md-2"
                  id="todate"
                  placeholder="To Date"
                  value={toSearchDate}
                  onChange={(e) =>
                    settoSearchDate(e.target.value) ||
                    serachfromtodate(fromSearchDate,e.target.value)
                  }
                />

                <input
                  type="text"
                  className="form-control mr-5 ml-5 col-md-3"
                  id="Search"
                  placeholder="Search"
                  autoFocus
                  value={search}
                  onChange={(e) =>
                    setsearch(e.target.value) || serach(e.target.value)
                  }
                />

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                  ref={Addmodelpopup}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Rent Information
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-12">
                          <form className="shadow p-4 mt-2">
                            <div className="form-group row">
                              <div className="form-gorup">
                                <label htmlFor="exampleFormControlSelect1">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  ref={inputName}
                                  autoFocus
                                  value={name}
                                  onChange={(e) => setname(e.target.value)}
                                />
                              </div>
                              <div className="form-gorup mt-3">
                                <label for="exampleFormControlSelect1">
                                  Description
                                </label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  id="desc"
                                  rows="3"
                                  value={desc}
                                  onChange={(e) => setdesc(e.target.value)}
                                ></textarea>
                              </div>
                              {/* <div className="form-group">
                  <label for="exampleFormControlSelect1">Select Number</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div> */}
                              <div className="col-auto form-gorup mt-3">
                                <label htmlFor="">From Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={fromDate}
                                  onChange={(e) => setfromDate(e.target.value)}
                                />
                              </div>
                              <div className="col-auto form-gorup mt-3">
                                <label htmlFor="">To Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={toDate}
                                  onChange={(e) => settoDate(e.target.value)}
                                />
                              </div>
                              <div className="col-auto form-gorup mt-3">
                                <label htmlFor="">Pay amount</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={payAmount}
                                  onChange={(e) => setpayAmount(e.target.value)}
                                />
                              </div>
                              <div className="col-auto form-gorup mt-3">
                                <label htmlFor="">left amount</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={leftAmount}
                                  onChange={(e) =>
                                    setleftAmount(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-auto form-gorup mt-3">
                                <label htmlFor="">Total amount</label>
                                <input
                                  disabled
                                  type="number"
                                  className="form-control"
                                  value={payAmount - leftAmount}
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-primary w-100 my-3"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={handelSubmitRent}
                            >
                              Submit
                            </button>

                            {/* <div className="d-flex justify-content-center links">
                Already have account? &nbsp;<a href="/login"> Sign in</a>
              </div> */}
                          </form>
                        </div>
                      </div>
                      {/* <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={searchData}
              pagination
              defaultSortFieldId={1}
              className="shadow"
            />
          </div>
        </div>
      </div>
    </>
  );
};
