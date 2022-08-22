import React from "react";
import "./App.css";

import TopNav from "./components/TopNav";
import ListWaypoints from "./components/ListWaypoints";
import DisplayWaypoints from "./components/DisplayWaypoints";

function App() {
  return (
    <div className="App">
      <TopNav />
      <div className="container">
        <ListWaypoints />
        <DisplayWaypoints />
      </div>
    </div>
  );
}

export default App;
