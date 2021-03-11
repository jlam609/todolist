import React, { useState } from "react";
import { isEmail, isPassword } from "../validate";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await axios({
              headers: { "Access-Control-Allow-Origin": "*" },
              method: "post",
              url: "http://dev.rapptrlabs.com/Tests/scripts/user-login.php",
              data: {
                email: username,
                password: password,
              },
            });
            console.log(response);
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
        </form>
      </div>
    </div>
  );
};

export default Login;