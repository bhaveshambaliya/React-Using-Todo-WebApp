import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import firebase from "firebase/compat";
import Todos from "./Todos";
import { useAuth } from "../Contexts/AuthContext";
import { loading } from "../loading";

function HomeTodo({ props }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [isSet, setuser] = useState(false);
  const { currentUser } = useAuth();
  const inputName = useRef();

  //when the app loads, we need to listen to the database and fetch new todos as they get Added/removed
  useEffect(() => {
    //this code here... firebase when the app.js loads
    //setTodos(snapshot.docs.map((doc) => doc.data()));

    if (currentUser != "undefined" && currentUser != null) {
      db.collection("todos")
        .where("uid", "==", currentUser.uid)
        //.orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          //setTodos(snapshot.docs.map((doc) => doc.data()));
          setTodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              todo: doc.data(),
            }))
          );
        });
      setuser(true);
      //inputNameRef.current.focus();
    }
  }, [currentUser]);

  const addTodoData = (e) => {
    e.preventDefault();
    let AddNewTodo = {
      name: name,
      desc: desc,
      uid: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (edit == true) {
      //console.log(edit);
      db.collection("todos").doc(editID).set(AddNewTodo);
      setEdit(false);
    } else {
      db.collection("todos").add(AddNewTodo);
    }
    //setTodos([...todos, AddNewTodo]);
    setName("");
    setDesc("");
  };

  const editData = (todo, id) => {
    inputName.current.focus();
    setName(todo.name);
    setDesc(todo.desc);
    setEditID(id);
    setEdit(true);
  };

  return !isSet ? (
    loading()
  ) : (
    <>
      <div className="countiner p-5">
        <div className="row justify-content-center ">
          <div className="col-md-6">
            <h2 className=" text-center"> Add Details </h2>
            <form className="shadow p-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1"> Product Name </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  ref={inputName}
                  aria-describedby="emailHelp"
                  placeholder=""
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1"> Description </label>
                <textarea
                  className="form-control"
                  id="desc"
                  rows="3"
                  placeholder=""
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></textarea>
              </div>
              <button
                disabled={(!name, !desc)}
                type="submit"
                className="btn btn-primary w-100 my-3"
                onClick={addTodoData}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6">
            {todos && todos.length > 0 ? (
              <Todos todos={todos} edit={edit} editData={editData} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeTodo;
