import React from "react";

import firebase from "./firebase";

function App() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      await db.collection("users").onSnapshot((docs) => {
        setUsers(docs.docs.map((doc) => doc.data()));
      });
    };
    fetchData();
  }, []);

  // db.collection("cities").doc("SF")
  // .onSnapshot((doc) => {
  //     console.log("Current data: ", doc.data());
  // });

  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
}

export default App;
