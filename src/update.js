import React, { Component } from "react";
import firebase from "./firebase";

export class update extends Component {
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  render() {
    console.log("update");
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
        <input type="text" />
        <input type="submit" value="save" />
        <input type="submit" value="logout" onClick={this.logout} />
      </div>
    );
  }
}

export default update;
