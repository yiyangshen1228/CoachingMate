import React, { useState } from "react";
import './index.less';

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  return (
    <div className="todoForm">
        <input type="input" class="form__field" placeholder="New tasks" name="name" id='name' onChange={handleChange} value={inputText}/>
        <button className="todoButton"
          onClick={() => {
            props.onAdd(inputText);
            setInputText("");
          }}
        >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
