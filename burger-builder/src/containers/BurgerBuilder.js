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
import * as actionTypes from "../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchased: false,
    processing: false,
    error: false,
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
    this.setState({ purchased: true });
  };

  modalCloseHandler = () => {
    this.setState({ purchased: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    // axios
    //   .get("https://burger-builder-dbs.firebaseio.com/ingredients/.json")
    //   .then((resp) => {
    //     this.setState({ error: false });
    //     this.setState({ ingredients: resp.data });
    //   })
    //   .catch(() => {
    //     console.log("err");
    //     this.setState({ error: true });
    //   });
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
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
          />
        </Aux>
      );
    }
    if (this.state.processing) {
      orderSummary = <Spinner />;
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
    ingredients: state.ingredients,
    price: state.price,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName,
      }),
    onRemoveIngredient: (ingredientName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
