import React from "react";
import firebase from "./firebase";
import Login from "./login";

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

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map((user) => (
            <li key={user.name}>{user.name}</li>
          ))}
        </ul>
        <Login
          handleInput={this.handleInput}
          email={this.state.email}
          password={this.state.password}
        />
      </div>
    );
  }
}

export default App;
