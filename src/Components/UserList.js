import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import DataTable from "react-data-table-component";
import { default as usersolid } from "../Components/Asset/Images/user-solid.svg";

export default function UserList() {
  const [userlist, setUserlist] = useState([]);
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUserlist(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const columns = [
    {
      name: <h5>Profile</h5>,
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
      sortable: true,
    },
    {
      name: <h5>Email</h5>,
      selector: (row) => row.Email,
      sortable: true,
    },
    {
      name: <h5>Address</h5>,
      selector: (row) => row.Address,
    },

    {
      name: <h5>Mobile</h5>,
      selector: (row) => row.Mobile,
    },
    {
      name: <h5>AlternetMobile</h5>,
      selector: (row) => row.AlternetMobile,
    },
    {
      name: <h5>Aadhaar</h5>,
      selector: (row) => row.Aadhaar,
    },
  ];

  return (
    <>
      <div className="countiner p-3">
        <div className="row justify-content-center ">
          <h2 className="text-center ">
            <b>User List </b>
          </h2>
          {/*           <table class="table shadow text-center">
            <thead class="thead-dark">
              <tr> */}
          {/* <th scope="col">UserID</th> */}
          {/* <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Mobile</th>
                <th scope="col">AlternetMobile</th>
                <th scope="col">Aadhaar</th> */}
          {/* </tr>
            </thead>
            <tbody> */}
          {/* {userlist.map((data) => {
                return (
                  <tr key={data.Uid}>
                    {/* <th scope="row">{data.Uid}</th> */}
          {/* <td>{data.Name}</td>
                    <td>{data.Email}</td>
                    <td>{data.Address}</td>
                    <td>{data.Mobile}</td>
                    <td>{data.AlternetMobile}</td>
                    <td>{data.Aadhaar}</td>
                  </tr> */}
          {/* ); })} */}
          {/* </tbody>
          </table> */}
          <DataTable
            columns={columns}
            data={userlist}
            pagination
            //defaultSortFieldId={2}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor=""> User List </label>
          <select className="form-control col-2">
            {userlist.map((data) => (
              <option key={data.Name} value={data.Uid}>
                {data.Name}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </>
  );
}
