import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "../public/style.scss";
import App from "./app";
import { store } from "./store/store";

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
  () => console.log("rendered")
);
