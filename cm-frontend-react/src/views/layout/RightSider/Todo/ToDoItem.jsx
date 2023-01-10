import { set } from "nprogress";
import React, {useState} from "react";
import './index.less';


function ToDoItem(props) {

  const [isActive, setIsActive] = useState(true);
  const clickList = () => {
    setIsActive(false)
  };

  return (
    <div
       onClick={() => {
        clickList();
        props.onChecked(props.id);
      }}
    className="listContainer" >
      <li 
      className="todoLi">{props.text}</li>
    </div>
  );
}

export default ToDoItem;
