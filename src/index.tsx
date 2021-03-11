import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import "../public/style.scss";

render(
  <Router>
    <h1>Hello World</h1>
  </Router>,
  document.getElementById("root"),
  () => console.log("rendered")
);
