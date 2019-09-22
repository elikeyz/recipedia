/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.scss';

class Home extends Component {
  render() {
    return (
      <main className="landing-background">
        <div className="overlay">
          <Container className="landing-container">
            <h1>Welcome to Recipedia</h1>
            <h2>Explore thousands of recipes from across the globe</h2>
            <br />
            <Link to="/recipes">
              <Button size="lg" variant="dark">Explore</Button>
            </Link>
          </Container>
        </div>
      </main>
    );
  }
}

export default Home;