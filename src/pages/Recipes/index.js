import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container, Form, Button, Spinner, Toast,
} from 'react-bootstrap';
import debounce from 'lodash.debounce';
import { getRecipes, clearRecipes } from '../../store/actions';
import RecipeCard from '../../components/RecipeCard';
import './recipes.scss';

export class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFieldInput: '',
      sortInput: 'r',
    };

    this.handleSearchFieldInputChange = this.handleSearchFieldInputChange.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

    window.onscroll = debounce(() => {
      const {
        getRecipes: searchForRecipes, error, isLoadingRecipes, hasMore, nextPage,
      } = this.props;
      const { searchFieldInput, sortInput } = this.state;

      if (error || isLoadingRecipes || !hasMore) return;

      if (window.innerHeight + document.documentElement.scrollTop === this.myscroll.offsetHeight) {
        searchForRecipes(searchFieldInput, nextPage, sortInput);
      }
    }, 100);
  }

  componentDidMount() {
    this.searchRecipes();
  }

  async searchRecipes(event) {
    if (event) event.preventDefault();
    const {
      getRecipes: searchForRecipes,
      clearRecipes: clearAllRecipes,
      nextPage,
    } = this.props;
    const { searchFieldInput, sortInput } = this.state;

    clearAllRecipes();
    await searchForRecipes(searchFieldInput, nextPage, sortInput);
  }

  handleSearchFieldInputChange(event) {
    this.setState({
      searchFieldInput: event.target.value,
    });
  }

  handleSortChange(event) {
    this.setState({
      sortInput: event.target.value,
    });
  }

  render() {
    const { searchFieldInput, sortInput } = this.state;
    const { recipes, isLoadingRecipes, error } = this.props;

    return (
      <main className="recipes-background" ref={(c) => { this.myscroll = c; }}>
        <Container>
          <h1>Search Recipes by name or ingredient</h1>
          <Form variant="dark" onSubmit={this.searchRecipes}>
            <Form.Group controlId="sortBy" className=" mr-sm-2">
              <Form.Label className=" mr-sm-2">Sort by</Form.Label>
              <Form.Control as="select" onChange={this.handleSortChange} value={sortInput}>
                <option value="r">Rating</option>
                <option value="t">Trendingness</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="search">
              <Form.Label className=" mr-sm-2">Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by Name or Ingredients"
                className=" mr-sm-2"
                value={searchFieldInput}
                onChange={this.handleSearchFieldInputChange}
                required
              />
              <Button variant="dark" type="submit">Submit</Button>
            </Form.Group>
          </Form>
          {
            searchFieldInput && (
            <h2>
              Search results for &ldquo;
              {searchFieldInput}
              &rdquo;
              sorted by
              {' '}
              {((input) => {
                if (input === 'r') return 'rating';
                if (input === 't') return 'trendingness';
                return 'rating';
              })(sortInput)}
            </h2>
            )
          }
          <div className="cards">
            {recipes.map((recipe) => (<RecipeCard key={recipe.recipe_id} recipe={recipe} />))}
          </div>
          {isLoadingRecipes && <Spinner animation="border" variant="dark" />}
          {
            error && (
            <Toast>
              <Toast.Header>
                <strong>Error</strong>
              </Toast.Header>
              <Toast.Body>{error}</Toast.Body>
            </Toast>
            )
          }
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
  hasMore: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  error: state.error,
  isLoadingRecipes: state.isLoadingRecipes,
  nextPage: state.nextPage,
  hasMore: state.hasMore,
});

export default connect(mapStateToProps, { getRecipes, clearRecipes })(Recipes);
