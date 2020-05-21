import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  const btnType =
    props.btnType === "Danger"
      ? `${classes.Button} ${classes.Danger}`
      : `${classes.Button} ${classes.Success}`;
  return (
    <button
      onClick={props.clicked}
      className={btnType}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
