import React from "react";
import "./App.css";

import ListWaypoints from "./components/ListWaypoints";
import DisplayWaypoints from "./components/DisplayWaypoints";

function App() {
  return (
    <div className="App">
      <div className="container">
        <ListWaypoints />
        <DisplayWaypoints />
      </div>
    </div>
  );
}

export default App;
