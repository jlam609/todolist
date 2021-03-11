import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/login";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="title">Rapptr Labs</h1>
      <Switch>
        <Route path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
