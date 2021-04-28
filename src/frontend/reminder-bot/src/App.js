import './App.css';
import React, {useState} from "react";
import axios from "axios";
//axios.post('http://localhost:4000/chat/string', studentObject)
//.then(res => console.log(res.data));

let axiosConfig = {
  headers: {
      'Content-Type' : 'text/html; charset=UTF-8',
      'Accept': 'Token',
      "Access-Control-Allow-Origin": "*",
  }
};


function App() {
  const [inputs,setInputs] = useState([])
  const [input,setInput] = useState("")
  const [isUser,setIsUser] = useState(true) //masih bingung
  const [outputs,setOutputs] = useState([])
  const [output,setOutput] = useState(0)

  function addInput () {
    setInputs([...inputs, {
      id: inputs.length,
      value: input
    }])

    axios.post('http://localhost:4000/chat/string', input , {headers: {"Content-Type": "text/plain"}})
    .then((res) => {
      console.log(res.data);
      setOutput(res.data);
    })

    addBot();
  }

  const addBot = () => {
    setOutputs([...outputs, {
      id: outputs.length,
      value: output
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
