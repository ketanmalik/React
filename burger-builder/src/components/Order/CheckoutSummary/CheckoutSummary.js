import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes fresh and healthy!</h1>
    <div style={{ width: "100%", height: "300px", margin: "auto" }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked>
      Cancel
    </Button>
    <Button btnType="Success" clicked>
      Submit
    </Button>
  </div>
);

export default checkoutSummary;
