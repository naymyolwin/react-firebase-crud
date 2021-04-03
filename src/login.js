import React from "react";
import { Link } from "react-router-dom";
//import firebase from "./firebase";

function login(props) {
  return (
    <div>
      <h1>Login Form</h1>
      <p>use firebase auth for authentication process</p>
      <input
        type="email"
        name="email"
        value={props.email}
        onChange={props.handleInput}
      />
      <input
        type="password"
        name="password"
        value={props.password}
        onChange={props.handleInput}
      />
      <input type="submit" value="login" onClick={props.onClick} />
      <Link to="/">
        <input type="submit" value="cancel" />
      </Link>
    </div>
  );
}

export default login;
