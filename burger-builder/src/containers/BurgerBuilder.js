import React, { Component } from "react";
import Aux from "../hoc/Aux";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/BuildControls/BuildControls";

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
    purchasable: false
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

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
