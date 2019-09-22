/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import recipeReducer from './reducers';

const middleware = [thunk];

const store = createStore(recipeReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
