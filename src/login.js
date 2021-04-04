import React from "react";
import { Link } from "react-router-dom";
import Update from "./update";
import firebase from "./firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loginStatus: false,
    ref: firebase.auth(),
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state.email);
      console.log(this.state.password);
    });
  };

  loginHandler = () => {
    this.state.ref
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        console.log("auth pass");
        this.setState({
          login: userCredential.user.email,
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  async getUsers() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loginStatus: true,
        });
      } else {
        this.setState({
          loginStatus: false,
        });
      }
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    if (this.state.loginStatus === false) {
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
          <input type="submit" value="login" onClick={this.loginHandler} />
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

export default Login;
