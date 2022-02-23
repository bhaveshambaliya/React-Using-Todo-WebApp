import React from "react";
import { TodoItems } from "./TodoItems";

const Todos = ({ editData, todos, edit }) => {
  return (
    <>
      <div className="ListofTodo">
        <h3 className="text-center"> All Details </h3>
        {/* <p>
          {props.todos.map((todo) => {
            return (
              <>
                <h1>Id :{todo.id}</h1>
                <h1>Todo : {todo.todo.name}</h1>
              </>
            );
          })}
        </p> */}
        {todos.length === 0
          ? "No Todo to Display"
          : todos.map((data) => {
              return (
                <TodoItems
                  todo={data.todo}
                  id={data.id}
                  key={data.id}
                  editData={editData}
                  edit={edit}
                />
              );
            })}
      </div>
    </>
  );
};

export default Todos;
