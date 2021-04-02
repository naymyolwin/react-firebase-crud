import React from "react";
import firebase from "./firebase";

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
          users: item,
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
      </div>
    );
  }
}

export default App;
