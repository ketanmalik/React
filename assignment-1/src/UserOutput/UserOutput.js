import React from "react";

const userOutput = props => {
  return (
    <div>
      <p>{props.users[0]}</p>
      <p>{props.users[1]}</p>
    </div>
  );
};

export default userOutput;
