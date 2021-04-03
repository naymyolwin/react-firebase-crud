import React, { Component } from "react";
import firebase from "./firebase";

export class update extends Component {
  state = {
    users: [],
    temp: [],
    ref: firebase.firestore().collection("users"),
  };

  async getUsers() {
    await this.state.ref.onSnapshot((snap) => {
      const item = [];
      snap.forEach((name) => {
        item.push(name.data());
      });
      this.setState({
        users: item.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
      });
    });
  }

  updateHandler = (e) => {
    console.log(e.target.name);
  };

  componentDidMount() {
    this.getUsers();
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        // An error happened.
      });
  };

  remove = (index) => {
    console.log(index - 1);

    this.setState({
      temp: this.state.users.splice(index - 1, 1),
      // tmp1 =temp.splice(index - 1, 1),
      // users=
    });
  };

  render() {
    return (
      <div>
        <h1>Update Data</h1>
        <p>
          after authentication, data from firebase should be in seperate text
          box
        </p>
        <p>click save will update back to firebase</p>
        <p>will add and delete later</p>
        {/*need to be loop from firebase */}
        <input type="submit" value="add" />
        {this.state.users.map((user) => (
          <div key={user.id}>
            <input
              name={user.id}
              type="text"
              value={user.name}
              onChange={this.updateHandler}
            />
            <button onClick={() => this.remove(user.id)}>remove</button>
          </div>
        ))}

        <input type="submit" value="save" />
        <input type="submit" value="logout" onClick={this.logout} />
      </div>
    );
  }
}

export default update;
