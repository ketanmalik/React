import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const summary = Object.keys(this.props.ingredients).map(ing => {
      return (
        <li key={ing}>
          <span style={{ textTransform: "capitalize" }}>{ing}</span>:{" "}
          {this.props.ingredients[ing]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Order Summary</h3>
        <p>Build you own Burger:</p>
        <ul>{summary}</ul>
        <p>
          <strong>Price: $ {this.props.price.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>
          Order
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
