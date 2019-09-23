/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import recipeReducer from './reducers';

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(recipeReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
