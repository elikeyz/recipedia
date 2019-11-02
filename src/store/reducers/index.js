import {
  GET_RECIPES_STARTED,
  GET_RECIPES_FAILED,
  GET_RECIPES_SUCCESS,
  CLEAR_RECIPES,
  MARK_RECIPES_END,
} from '../constants';

const initialState = {
  error: '',
  recipes: [],
  nextPage: 1,
  isLoadingRecipes: false,
  hasMore: true,
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
      return {
        ...state, recipes: [], nextPage: 1, hasMore: true,
      };
    case MARK_RECIPES_END:
      return { ...state, hasMore: false };
    default:
      return state;
  }
};

export default recipeReducer;
