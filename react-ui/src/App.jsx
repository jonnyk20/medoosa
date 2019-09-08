import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Share from "./Share";
import Home from "./Home";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/share" exact component={Share} />
      </div>
    </Router>
  );
}

export default App;
