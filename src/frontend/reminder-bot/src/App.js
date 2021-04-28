import './App.css';
import React, {useState} from "react";
import axios from "axios";
//axios.post('http://localhost:4000/chat/string', studentObject)
//.then(res => console.log(res.data));

function App() {
  const [inputs,setInputs] = useState([])
  const [input,setInput] = useState("")
  const [isUser,setIsUser] = useState(true) //masih bingung

  function addInput () {
    setInputs([...inputs, {
      id: inputs.length,
      value: input
    }])
  }

  const addBot = () => {
    setInputs([...inputs, {
      id: inputs.length,
      value: "i am bot"
    }])
  }

  const handleClick = async (e) => {
    const code = e.keyCode || e.which;
    console.log(code);

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
              <h2 className="user" key={input.id}>{input.value}</h2> //ini nanti ada conditional classNamenya user atau bot
            ))
          }
        </div>
        <input type="text" onChange={(e) => setInput(e.target.value)} onKeyPress={handleClick} value={input}></input>
      </div>
    </div>
  );
}

export default App;
