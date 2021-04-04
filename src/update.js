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

      snap.forEach((user) => {
        const docID = user.id;
        item.push({
          name: user.data().name,
          id: user.data().id,
          docID: docID,
        });
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

  remove = (user) => {
    console.log(user.docID);
    this.state.ref.doc(user.docID).delete();

    // this.setState({
    //   temp: this.state.users.splice(user.id - 1, 1),
    // });
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
            <button onClick={() => this.remove(user)}>remove</button>
          </div>
        ))}

        <input type="submit" value="save" />
        <input type="submit" value="logout" onClick={this.logout} />
      </div>
    );
  }
}

export default update;
