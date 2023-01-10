import React from "react";
import './index.less';
function ToDoItem(props) {
  return (
    <div
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li className="todoli">{props.text}</li>
    </div>
  );
}

export default ToDoItem;
