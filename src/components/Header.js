/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import recipediaIcon from '../static/images/recipedia logo.png';

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Link to="/">
            <Navbar.Brand>
              <img
                src={recipediaIcon}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Recipedia logo"
              />
              {' Recipedia'}
            </Navbar.Brand>
          </Link>
        </Navbar>
      </header>
    );
  }
}

export default Header;
