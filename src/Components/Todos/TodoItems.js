import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

export const TodoItems = ({ todo, id, editData, edit }) => {
  return (
    <>
      <div className=" shadow p-3 mt-3">
        {/* <div>{todo.sno}</div> */}
        <div className="">
          <b>{todo.name}</b>
        </div>
        <div className="">{todo.desc}</div>

        <button
          className="btn btn-sm btn-success mr-2 mt-2"
          onClick={() => {
            editData(todo, id);
          }}
        >
          Edit
        </button>
        <button
          disabled={edit}
          className="btn btn-sm btn-danger mt-2"
          onClick={(event) => db.collection("todos").doc(id).delete()}
        >
          Delete
        </button>
      </div>

      {/* basic modal */}
      {/* <div
        className="modal fade"
        id="basicModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="basicModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-sm" id="myModalLabel">
                Edit Product Details
              </h4>
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
              <form className="p-4">
                <div className="form-group">
                  <label htmlFor="Name"> Name</label>
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(event) => {
                      seteditName(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Description"> Description</label>
                  <input
                    className="form-control"
                    value={editDesc}
                    onChange={(event) => {
                      seteditDesc(event.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
