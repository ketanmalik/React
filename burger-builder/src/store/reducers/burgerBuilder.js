import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  meat: 1,
  bacon: 1.3,
  building: false,
};

const initialState = {
  ingredients: null,
  price: 3,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      return updateObject(state, updatedState);
    }
    case actionTypes.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    }
    case actionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        errror: false,
        price: 3,
        building: false,
      };
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
