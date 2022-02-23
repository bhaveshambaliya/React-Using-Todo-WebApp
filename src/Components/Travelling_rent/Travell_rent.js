import React, { useState, useEffect, useRef } from 'react'

export default function Travell_rent() {

  const [fields, setFields] = useState([])
  const [Totalperson, setTotalperson] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");

  const AddDynamicBox = () => {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
    setTotalperson(values.length);
  }

  const addTotalPerson = () => {
    const values = [...fields];
    for (let index = 0; index < Totalperson; index++) {
      values.push({ Name: null, pay: null, left: null, total: 100, value: null });
    }
    setFields(values);
  }

  const handleChange = (i, event) => {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  const handleRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  const RemoveDynamicBox = () => {
    setTotalperson("")
    setFields([]);
  }

  return (
    <>
      <div className="countiner p-3">
        <div className="row justify-content-center ">
          <div className="section-title">
            <span>Rent</span>
            <h2 className="text-center"> Rent </h2>
          </div>

          <div className="shadow col-md-11">
            <h5 className="text-center mt-2 p-3"> Travelling Rent Information </h5>
            <div className="form-group row">
              <div className="form-gorup d-flex justify-content-start mr-2 ml-2">
                <label htmlFor="exampleFormDateSelect1" className="form-label mr-3 mt-2"> Total Person</label>
                <input
                  type="number"
                  id="fromdate"
                  placeholder=""
                  value={Totalperson}
                  onChange={(e) => setTotalperson(e.target.value)}
                />

                <label htmlFor="exampleFormDateSelect1" className="form-label mr-3 mt-2 ml-3"> Total Amount</label>
                <input
                  type="number"
                  id="fromdate"
                  placeholder=""
                  value={TotalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-primary btn-sm col-md-1 ml-3"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={addTotalPerson}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm col-md-1 ml-3"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={AddDynamicBox}
                >
                  <i className="fas fa-plus"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm col-md-1 ml-3"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={RemoveDynamicBox}
                >
                  <i className="fas fa-trash"></i>
                </button>

              </div>
            </div>

            <div className="form-group">
              {fields.map((field, idx) => {
                return (
                  <div className="form-gorup d-flex col-md-12 mt-2" key={`${field}-${idx}`}>
                    <label htmlFor="name" className="mt-2"> Name</label>
                    <input
                      type="text"
                      className="form-control col-md-2 ml-2"
                      placeholder=""
                      onChange={e => handleChange(idx, e)}
                    />
                    <label htmlFor="pay" className="mt-2 ml-2"> Pay</label>
                    <input
                      type="text"
                      className="form-control col-md-2 ml-2"
                      placeholder=""
                      onChange={e => handleChange(idx, e)}
                    />
                    <label htmlFor="left" className="ml-2 mt-2"> Left</label>
                    <input
                      type="text"
                      className="form-control col-md-2 ml-2"
                      placeholder=""
                      values={field.left}
                    // onChange={e => handleChange(idx, e)}
                    />
                    <button type="button" className="btn btn-danger btn-sm ml-2 " onClick={() => handleRemove(idx)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
