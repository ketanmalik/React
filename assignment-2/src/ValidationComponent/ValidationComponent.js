import React from "react";

const validationComponent = props => {
  let validationMsg = "Text too short";
  if (props.len >= 5) validationMsg = "Text long enough";
  return (
    <div>
      <p>{validationMsg}</p>
    </div>
  );
};

export default validationComponent;
