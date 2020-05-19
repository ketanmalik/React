import React, { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../UI/Button/Button";
import Spinner from "../../../UI/Spinner/Spinner";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    processing: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ processing: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Ketan",
        address: {
          street: "11 Tetlow Street",
          apt: "53",
          zip: "02115",
          city: "Boston",
          state: "MA",
          country: "USA",
        },
        email: "ketanmalik@gmail.com",
        phone: "8572078509",
      },
    };
    axios
      .post("/orders.json", order)
      .then((resp) => {
        this.setState({ processing: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ processing: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.processing) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
