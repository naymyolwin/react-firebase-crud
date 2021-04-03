import React from "react";
import firebase from "./firebase";
import Login from "./login";
import Update from "./update";

class App extends React.Component {
  state = {
    users: [],
    email: "",
    password: "",
    ref: firebase.firestore().collection("users"),
  };

  async getUsers() {
    await this.state.ref.onSnapshot((snap) => {
      const item = [];
      snap.forEach((name) => {
        item.push(name.data());
      });
      this.setState({
        // users: item.sort("id"),
        users: item.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
      });
    });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async loginHandler(event, email, password) {
    event.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          // ...
        },
        () => {}
      )
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <h1>List of Users</h1>
        <p>read from firebase and listed all the user below</p>
        <ul>
          {this.state.users.map((user) => (
            <li key={user.name}>{user.name}</li>
          ))}
        </ul>
        <Login
          handleInput={this.handleInput}
          email={this.state.email}
          password={this.state.password}
          onClick={(event) => {
            this.loginHandler(event, this.state.email, this.state.password);
          }}
        />
        <Update />
      </div>
    );
  }
}

export default App;
