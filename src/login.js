import React from "react";
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
    </div>
  );
}

export default login;
