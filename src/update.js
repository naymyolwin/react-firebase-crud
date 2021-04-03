import React from "react";

function update() {
  return (
    <div>
      <h1>Update Data</h1>
      <p>
        after authentication, data from firebase should be in seperate text box
      </p>
      <p>click save will update back to firebase</p>
      <p>will add and delete later</p>
      {/*need to be loop from firebase */}
      <input type="text" />
      <input type="submit" value="save" />
      <input type="submit" value="logout" />
    </div>
  );
}

export default update;
