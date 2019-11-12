import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.scss';

function Home() {
  return (
    <main className="landing-background">
      <div className="overlay">
        <Container className="landing-container">
          <h1 className="landing-heading">Welcome to Recipedia</h1>
          <p className="landing-text">Explore thousands of recipes from across the globe</p>
          <br />
          <Link to="/recipes">
            <Button size="lg" variant="dark">Explore</Button>
          </Link>
        </Container>
      </div>
    </main>
  );
}

export default Home;
