import React from "react";
import { Link } from "react-router-dom";
import Update from "./update";
import firebase from "./firebase";

class login extends React.Component {
  state = {
    email: "",
    password: "",
    loginStatus: false,
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async loginHandler(event, email, password) {
    event.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.setState({
          loginuser: userCredential.user.email,
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async getUsers() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loginuser: true,
        });
      } else {
        this.setState({
          loginuser: false,
        });
      }
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    if (this.state.loginuser === false) {
      return (
        <div>
          <h1>Login Form</h1>
          <p>use firebase auth for authentication process</p>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
          />
          <input type="submit" value="login" onClick={this.onClick} />
          <Link to="/">
            <input type="submit" value="cancel" />
          </Link>
        </div>
      );
    } else {
      return <Update />;
    }
  }
}

export default login;
