import './App.css';
import React, {useState} from "react";


function App() {
  const [inputs,setInputs] = useState([])
  const [input,setInput] = useState("")

  const addInput = () => {
    setInputs([...inputs, {
      id: inputs.length,
      value: input
    }])
  }

  const handleClick = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      addInput()
      setInput("")
    }
  }

  return (
    <div className="container">
      <div className="chat">
        <h1>Chatbot App</h1>
        <div className="historyContainer">
          {
            inputs.map(input => (
              <h2 className="user" key={input.id}>{input.value}</h2>
            ))
          }
        </div>
        <input type="text" onChange={(e) => setInput(e.target.value)} onKeyPress={handleClick} value={input}></input>
      </div>
    </div>
  );
}

export default App;
