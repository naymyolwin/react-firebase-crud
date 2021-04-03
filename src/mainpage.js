import React from "react";
import { Link } from "react-router-dom";

function mainpage(props) {
  return (
    <div>
      <h1>List of Users</h1>
      <p>read from firebase and listed all the user below</p>
      <ul>
        {props.users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
      <Link to="/login">
        <input type="submit" value="Login" />
      </Link>
    </div>
  );
}

export default mainpage;
