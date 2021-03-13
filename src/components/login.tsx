import React, { useState } from "react";
import { isEmail, isPassword } from "../validate";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import { StoreState } from "../store/store";
import { login } from "../store/actions";

const Login: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state: StoreState) => state);
  const history = useHistory();
  if (loggedIn) {
    history.push("/tasks");
  }
  return (
    <div>
      <h1 className="title">Rapptr Labs</h1>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const status = (
                await axios.post("/api/login", {
                  email: username,
                  password: password,
                })
              ).data;
              if (status) {
                await dispatch(login());
                history.push("/tasks");
              }
            } catch (e) {
              console.log("error");
              setServerError(
                "The Server Could Not Be Reached Or Login Was Unsuccessful. Please Try Again Later"
              );
            }
          }}
        >
          <div className="input-container">
            <h3 className="input-label">Email</h3>
            <br />
            <i
              className={
                !isEmail(username) && username !== ""
                  ? "fa fa-user icon error-icon"
                  : "fa fa-user icon"
              }
            ></i>
            <input
              placeholder="user@rapptrlabs.com"
              value={username}
              className={
                !isEmail(username) && username !== ""
                  ? "input-field error-input"
                  : "input-field"
              }
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
            {username !== "" && !isEmail(username) && (
              <h5 className="error-message">Invalid Email</h5>
            )}
          </div>
          <div className="input-container">
            <h3 className="input-label">Password</h3>
            <br />
            <i
              className={
                !isPassword(password) && password !== ""
                  ? "fa fa-lock icon error-icon"
                  : "fa fa-lock icon"
              }
            ></i>
            <input
              placeholder="Must be at least 4 characters"
              value={password}
              type="password"
              className={
                !isPassword(password) && password !== ""
                  ? "input-field error-input"
                  : "input-field"
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            {password !== "" && !isPassword(password) && (
              <h5 className="error-message">Invalid Password</h5>
            )}
          </div>
          <br />
          <button
            className={
              isEmail(username) && isPassword(password)
                ? "login-button"
                : "login-button error-button"
            }
            disabled={isEmail(username) && isPassword(password) ? false : true}
          >
            Login
          </button>
          <h5 className="error-message">{serverError}</h5>
        </form>
      </div>
    </div>
  );
};

export default Login;
