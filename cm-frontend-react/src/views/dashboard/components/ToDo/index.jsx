import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import './index.less';



function ToDoApp(props) {
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
    <div className="todobody">
    <div className= "todocontainer">
      <div className="todoheading">
        <h1>Up Coming Tasks</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default ToDoApp;
