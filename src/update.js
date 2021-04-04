import React, { Component } from "react";
import firebase from "./firebase";

export class update extends Component {
  unsubRef;
  state = {
    users: [],
    temp: [],
    ref: firebase.firestore().collection("users"),
  };

  async getUsers() {
    this.unsubRef = await this.state.ref.onSnapshot((snap) => {
      const item = [];

      snap.forEach((user) => {
        const docID = user.id;
        item.push({
          name: user.data().name,
          //id: user.data().id,
          docID: docID,
        });
      });
      this.setState({
        users: item, //.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
      });
    });
  }

  updateHandler = (e) => {
    // const objIndex = this.state.users.findIndex((obj) => obj.id == e.id);
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.docID === e.target.id
          ? Object.assign(user, { name: e.target.value })
          : user
      ),
    }));
    //console.log("Before update: ", this.state.users[objIndex].name);
    //  console.log([e.target.id.name]);
  };

  componentDidMount() {
    this.getUsers();
  }

  async componentWillUnmount() {
    await this.stopListener(this.unsubRef);
  }

  // function to stop listener
  stopListener = (unsubRef) => {
    unsubRef();
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then // can do something.
      ()
      .catch((error) => {
        // An error happened.
      });
  };

  add = () => {
    this.state.ref
      .add({
        name: "",
      })
      .then(function (docRef) {
        console.log("Tutorial created with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding Tutorial: ", error);
      });
  };

  save = () => {
    this.state.users.forEach((user) => {
      this.state.ref.doc(user.docID).update({
        name: user.name,
      });
    });
  };

  remove = (user) => {
    this.state.ref.doc(user.docID).delete();
  };

  render() {
    return (
      <div>
        <h1>Update Data</h1>

        <input type="submit" value="add" onClick={this.add} />
        {this.state.users.map((user) => (
          <div key={user.docID}>
            <input
              id={user.docID}
              type="text"
              value={user.name}
              onChange={this.updateHandler}
            />
            <button onClick={() => this.remove(user)}>remove</button>
          </div>
        ))}

        <input type="submit" value="save" onClick={this.save} />
        <input type="submit" value="logout" onClick={this.logout} />
      </div>
    );
  }
}

export default update;
