import React from "react";
//import firebase from "./firebase";

function login(props) {
  return (
    <div>
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
      <input type="submit" />
    </div>
  );
}

export default login;
