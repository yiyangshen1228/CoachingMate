import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import './index.less';



function Todo(props) {
  // 应该从数据库中读取还未完成的tasks
  // const preTask = [["running 3 km"],["swimming 5km"]]
  const preTask = props.preTask;
  const [items, setItems] = useState([...preTask]);
  // const [items, setItems] = useState([]);

  function addItem(inputText) {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="todoBody">
    <div className= "todoContainer">
      <div className="todoHeading">
        <h1>Tasks List</h1>
      </div>
      <div className="inputContainer"><InputArea onAdd={addItem}/></div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
              ></ToDoItem>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Todo;
