import React from "react";
import firebase from "./firebase";
import Login from "./login";

class App extends React.Component {
  state = {
    users: [],
    ref: firebase.firestore().collection("users"),
  };

  async getUsers() {
    await this.state.ref.onSnapshot((snap) => {
      const item = [];
      snap.forEach((name) => {
        item.push(name.data());
      });
      this.setState(
        {
          // users: item.sort("id"),
          users: item.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
        },
        () => {
          console.log(this.state.users);
        }
      );
    });
  }

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
        <Login />
      </div>
    );
  }
}

export default App;
