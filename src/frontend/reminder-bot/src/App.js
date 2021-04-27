import React from "react";
import './App.css';
import {Provider} from "react-redux";
import store from "./store";

import Chat from "./components/chat/Chat";

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <Chat />
      </div>
    </Provider>
  );
}

export default App;
