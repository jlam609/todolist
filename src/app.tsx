import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/login";
import Tasks from "./components/tasks";

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route exact={true} path="/tasks" component={Tasks} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
