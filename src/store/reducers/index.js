import {
  GET_RECIPES_STARTED,
  GET_RECIPES_FAILED,
  GET_RECIPES_SUCCESS,
  CLEAR_RECIPES,
  GET_RECIPE_STARTED,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAILED,
} from '../constants';

const initialState = {
  error: '',
  recipes: [],
  nextPage: 1,
  recipe: {},
  isLoadingRecipes: false,
  isLoadingRecipe: false,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES_STARTED:
      return { ...state, isLoadingRecipes: true, error: '' };
    case GET_RECIPES_SUCCESS:
      return {
        ...state,
        isLoadingRecipes: false,
        recipes: [...state.recipes, ...action.recipes],
        nextPage: state.nextPage + 1,
      };
    case GET_RECIPES_FAILED:
      return { ...state, isLoadingRecipes: false, error: action.error };
    case CLEAR_RECIPES:
      return { ...state, recipes: [], nextPage: 1 };
    case GET_RECIPE_STARTED:
      return { ...state, isLoadingRecipe: true, error: '' };
    case GET_RECIPE_SUCCESS:
      return { ...state, isLoadingRecipe: false, recipe: action.recipe };
    case GET_RECIPE_FAILED:
      return { ...state, isLoadingRecipe: false, error: action.error };
    default:
      return state;
  }
};

export default recipeReducer;
