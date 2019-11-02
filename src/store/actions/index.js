import 'babel-polyfill';
import axios from 'axios';
import dotenv from 'dotenv';
import {
  GET_RECIPES_STARTED,
  GET_RECIPES_FAILED,
  GET_RECIPES_SUCCESS,
  CLEAR_RECIPES,
  MARK_RECIPES_END,
} from '../constants';

dotenv.config();

export const getRecipes = (q, page = 1, sort = 'r') => async (dispatch) => {
  dispatch({ type: GET_RECIPES_STARTED });

  const query = encodeURIComponent(q);

  try {
    const { data: { recipes } } = await axios.get(`https://www.food2fork.com/api/search?key=621e010c24b40e6f096a1508a90aa823&q=${query}&page=${page}&sort=${sort}`);

    dispatch({ type: GET_RECIPES_SUCCESS, recipes });

    if (recipes.length < 1) dispatch({ type: MARK_RECIPES_END });
  } catch ({ message: error }) {
    dispatch({ type: GET_RECIPES_FAILED, error });
  }
};

export const clearRecipes = () => (dispatch) => {
  dispatch({ type: CLEAR_RECIPES });
};
