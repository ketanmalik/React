import React from "react";
import Aux from "../../../hoc/Aux";

const orderSummary = props => {
  const summary = Object.keys(props.ingredients).map(ing => {
    return (
      <li key={ing}>
        <span style={{ textTransform: "capitalize" }}>{ing}</span>:{" "}
        {props.ingredients[ing]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Order Summary</h3>
      <p>Build you own Burger:</p>
      <ul>{summary}</ul>
    </Aux>
  );
};

export default orderSummary;
