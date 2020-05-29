import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../hoc/Aux";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../UI/Spinner/Spinner";
import axios from "../axios-orders";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchased: false,
  };

  purchasableHandler(ingredients) {
    const sum = Object.keys(ingredients)
      .map((k) => {
        return ingredients[k];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchasedhandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchased: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  modalCloseHandler = () => {
    this.setState({ purchased: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Something went wrong :(</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelHandler={this.modalCloseHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabledInfo={disabledInfo}
            price={this.props.price}
            purchasable={this.props.price > 3}
            clicked={this.purchasedhandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchased} modalClosed={this.modalCloseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
