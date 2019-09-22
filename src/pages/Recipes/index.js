/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Form, FormControl, Button, Spinner, Toast,
} from 'react-bootstrap';
import { getRecipes, clearRecipes } from '../../store/actions';
import RecipeCard from '../../components/RecipeCard';
import './recipes.scss';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFieldInput: '',
    };

    this.handleSearchFieldInputChange = this.handleSearchFieldInputChange.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
  }

  handleSearchFieldInputChange(event) {
    this.setState({
      searchFieldInput: event.target.value,
    });
  }

  async searchRecipes(event) {
    event.preventDefault();
    const { getRecipes: searchRecipes, clearRecipes: clearAllRecipes } = this.props;
    const { searchFieldInput } = this.state;

    clearAllRecipes();
    await searchRecipes(searchFieldInput);
  }

  render() {
    const { searchFieldInput } = this.state;
    const { recipes, isLoadingRecipes, error } = this.props;

    return (
      <main className="recipes-background">
        <Container>
          <h1>Search Recipes by name or ingredient</h1>
          <Row>
            <Col />
            <Col xs={10} md={8}>
              <Form inline variant="dark" onSubmit={this.searchRecipes}>
                <FormControl
                  type="text"
                  placeholder="Eg name, ingredient"
                  className=" mr-sm-2"
                  value={searchFieldInput}
                  onChange={this.handleSearchFieldInputChange}
                />
                <Button variant="dark" type="submit">Submit</Button>
              </Form>
            </Col>
            <Col />
          </Row>
          <div className="cards">
            {recipes.map((recipe) => (<RecipeCard key={recipe.recipe_id} recipe={recipe} />))}
          </div>
          {isLoadingRecipes ? <Spinner animation="border" variant="dark" /> : ''}
          {error ? <Toast><Toast.Body>{error}</Toast.Body></Toast> : ''}
        </Container>
      </main>
    );
  }
}

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  clearRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string.isRequired,
  isLoadingRecipes: PropTypes.bool.isRequired,
  nextPage: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  error: state.error,
  isLoadingRecipes: state.isLoadingRecipes,
  nextPage: state.nextPage,
});

export default connect(mapStateToProps, { getRecipes, clearRecipes })(Recipes);
