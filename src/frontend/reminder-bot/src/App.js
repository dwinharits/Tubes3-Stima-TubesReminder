import './App.css';
import React, {useState} from "react";

function App() {
  const [input,setInput] = useState(null)
  const [output,setOutput] = useState(false)

  function getInput(input){
    setInput(input.target.value)
    setOutput(false)
  }

  return (
    <div className="container">
      <div className="chat">
        <h1>Chatbot App</h1>
        <div className="historyContainer">
          {
            output ?
            <h2 className="user">{input}</h2>
            : null
          }
        </div>
        <input type="text" onChange={getInput} onKeyPress={() => setOutput(true)}></input>
      </div>
    </div>
  );
}

export default App;
