/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.scss';

class Home extends Component {
  render() {
    return (
      <main>
        <div className="overlay">
          <Container>
            <h1>Welcome to Recipedia</h1>
            <h2>Explore thousands of recipes from across the globe</h2>
            <br />
            <Link to="/recipes">
              <Button size="lg">Explore</Button>
            </Link>
          </Container>
        </div>
      </main>
    );
  }
}

export default Home;
