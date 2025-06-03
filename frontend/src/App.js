import React from "react";
import ScriptExecutor from "./components/ScriptExecutor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> React + Express Shell Script Demo</h1>
        <p>Click the button below to execute a shell script on the backend!</p>
        <ScriptExecutor />
      </header>
    </div>
  );
}

export default App;
