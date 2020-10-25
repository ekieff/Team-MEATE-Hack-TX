import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-dom";
import { db } from "../firebase";
import SimpleMap from "./Map";
require('dotenv').config()

function Homepage(props) {
  return (
    <div>
      <h1>Welcome to Project Harvest</h1>
        <h3>Connect with food resources in your area below</h3>
      <SimpleMap center={{ lat: 30.23532, lng: -97.72787 }} />
    </div>
  );
}

export default Homepage;
