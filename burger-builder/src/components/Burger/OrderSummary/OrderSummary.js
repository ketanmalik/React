import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../../UI/Button/Button";

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
      <p>
        <strong>Price: $ {props.price.toFixed(2)}</strong>
      </p>
      <Button btnType="Danger" clicked={props.purchaseCancelHandler}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinueHandler}>
        Order
      </Button>
    </Aux>
  );
};

export default orderSummary;
