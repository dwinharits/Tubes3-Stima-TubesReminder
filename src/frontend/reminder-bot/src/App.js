import './App.css';
import React, {useState} from "react";
import axios from "axios";
//axios.post('http://localhost:4000/chat/string', studentObject)
//.then(res => console.log(res.data));

function App() {
  const [inputs,setInputs] = useState([])
  const [input,setInput] = useState("")
  const [isUser,setIsUser] = useState(true) //masih bingung
  const [outputs,setOutputs] = useState([])
  const [output,setOutput] = useState("")

  function addInput () {
    setInputs([...inputs, {
      id: inputs.length,
      value: input
    }])
  }

  const addBot = () => {
    setOutputs([...outputs, {
      id: outputs.length,
      value: "i am bot"
    }])
  }

  const handleClick = async (e) => {
    const code = e.keyCode || e.which;
    console.log(code);

    if (code === 13) {
      addInput()
      addBot()
      setInput("")
    }
  }

  return (
    <div className="container">
      <div className="chat">
        <h1>Chatbot App</h1>
        <div className="historyContainer">
          {
            inputs.map((input,index) => {
              const output = outputs[index]
              return (
                <div>
                  <div className="user">{input.value}</div>
                  <div className="bot">{output.value}</div>
                </div>
              )
            })
          }
        </div>
        <input type="text" onChange={(e) => setInput(e.target.value)} onKeyPress={handleClick} value={input}></input>
      </div>
    </div>
  );
}

export default App;
