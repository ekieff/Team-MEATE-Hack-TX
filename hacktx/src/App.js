import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import components
import Homepage from "./components/Homepage";
import About from "./components/About";
import AddPantry from "./components/AddPantry";
import PantryId from "./components/PantryId";
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/add" component={AddPantry} />
      <Route exact path="/pantry/:id" component={PantryId} />
    </Router>
  );
}

export default App;
