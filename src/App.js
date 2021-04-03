import React from "react";
import firebase from "./firebase";
import Login from "./login";
import Update from "./update";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mainpage from "./mainpage";

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
      this.setState({
        users: item.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
      });
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Switch>
            <Route exact path="/">
              <Mainpage users={this.state.users} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/upate">
              <Update />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
