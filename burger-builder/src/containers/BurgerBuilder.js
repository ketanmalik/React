import React, { Component } from "react";
import Aux from "../hoc/Aux";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../UI/Spinner/Spinner";
import axios from "../axios-orders";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  meat: 1,
  bacon: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3,
    purchasable: false,
    purchased: false,
    processing: false
  };

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const ingredientPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + ingredientPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.purchasableHandler(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] === 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const ingredientPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - ingredientPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.purchasableHandler(updatedIngredients);
  };

  purchasableHandler(ingredients) {
    const sum = Object.keys(ingredients)
      .map(k => {
        return ingredients[k];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchasedhandler = () => {
    this.setState({ purchased: true });
  };

  modalCloseHandler = () => {
    this.setState({ purchased: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ processing: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Ketan",
        address: {
          street: "11 Tetlow Street",
          apt: "53",
          zip: "02115",
          city: "Boston",
          state: "MA",
          country: "USA"
        },
        email: "ketanmalik@gmail.com",
        phone: "8572078509"
      }
    };
    axios
      .post("/orders.jsn", order)
      .then(resp => {
        console.log(resp);
        this.setState({ processing: false, purchased: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ processing: false, purchased: false });
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelHandler={this.modalCloseHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );

    if (this.state.processing) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchased} modalClosed={this.modalCloseHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          clicked={this.purchasedhandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
