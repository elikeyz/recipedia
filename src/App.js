/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
