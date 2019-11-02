import recipeReducer from './index';
import {
  GET_RECIPES_STARTED,
  GET_RECIPES_FAILED,
  GET_RECIPES_SUCCESS,
  CLEAR_RECIPES,
  MARK_RECIPES_END,
} from '../constants';

const initialState = {
  error: '',
  recipes: [],
  nextPage: 1,
  isLoadingRecipes: false,
  hasMore: true,
};

const recipes = [
  {
    publisher: 'Healthy Delicious',
    f2f_url: 'http://food2fork.com/view/0c2e90',
    title: 'Baked Chicken and Spinach Flautas',
    source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
    recipe_id: '0c2e90',
    image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
    social_rank: 100,
    publisher_url: 'http://www.healthy-delicious.com',
  },
];

describe('Recipe Reducer', () => {
  test('should return the initial state', () => {
    expect(recipeReducer(initialState, {})).toEqual({
      error: '',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: false,
      hasMore: true,
    });
  });

  test('should handle GET_RECIPES_STARTED', () => {
    expect(recipeReducer(initialState, {
      type: GET_RECIPES_STARTED,
    })).toEqual({
      error: '',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: true,
      hasMore: true,
    });
  });

  test('should handle GET_RECIPES_SUCCESS', () => {
    expect(recipeReducer(initialState, {
      type: GET_RECIPES_SUCCESS,
      recipes,
    })).toEqual({
      error: '',
      recipes: [
        {
          publisher: 'Healthy Delicious',
          f2f_url: 'http://food2fork.com/view/0c2e90',
          title: 'Baked Chicken and Spinach Flautas',
          source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
          recipe_id: '0c2e90',
          image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
          social_rank: 100,
          publisher_url: 'http://www.healthy-delicious.com',
        },
      ],
      nextPage: 2,
      isLoadingRecipes: false,
      hasMore: true,
    });

    expect(recipeReducer({
      error: '',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: true,
      hasMore: true,
    }, {
      type: GET_RECIPES_SUCCESS,
      recipes,
    })).toEqual({
      error: '',
      recipes: [
        {
          publisher: 'Healthy Delicious',
          f2f_url: 'http://food2fork.com/view/0c2e90',
          title: 'Baked Chicken and Spinach Flautas',
          source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
          recipe_id: '0c2e90',
          image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
          social_rank: 100,
          publisher_url: 'http://www.healthy-delicious.com',
        },
      ],
      nextPage: 2,
      isLoadingRecipes: false,
      hasMore: true,
    });
  });

  test('should handle GET_RECIPES_FAILED', () => {
    expect(recipeReducer(initialState, {
      type: GET_RECIPES_FAILED,
      error: 'Request failed with status code 400',
    })).toEqual({
      error: 'Request failed with status code 400',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: false,
      hasMore: true,
    });
  });

  expect(recipeReducer({
    error: '',
    recipes: [],
    nextPage: 1,
    isLoadingRecipes: true,
    hasMore: true,
  }, {
    type: GET_RECIPES_FAILED,
    error: 'Request failed with status code 400',
  })).toEqual({
    error: 'Request failed with status code 400',
    recipes: [],
    nextPage: 1,
    isLoadingRecipes: false,
    hasMore: true,
  });

  test('should handle MARK_RECIPES_END', () => {
    expect(recipeReducer(initialState, {
      type: MARK_RECIPES_END,
    })).toEqual({
      error: '',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: false,
      hasMore: false,
    });

    expect(recipeReducer({
      error: '',
      recipes: [
        {
          publisher: 'Healthy Delicious',
          f2f_url: 'http://food2fork.com/view/0c2e90',
          title: 'Baked Chicken and Spinach Flautas',
          source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
          recipe_id: '0c2e90',
          image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
          social_rank: 100,
          publisher_url: 'http://www.healthy-delicious.com',
        },
      ],
      nextPage: 2,
      isLoadingRecipes: false,
      hasMore: true,
    }, {
      type: MARK_RECIPES_END,
    })).toEqual({
      error: '',
      recipes: [
        {
          publisher: 'Healthy Delicious',
          f2f_url: 'http://food2fork.com/view/0c2e90',
          title: 'Baked Chicken and Spinach Flautas',
          source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
          recipe_id: '0c2e90',
          image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
          social_rank: 100,
          publisher_url: 'http://www.healthy-delicious.com',
        },
      ],
      nextPage: 2,
      isLoadingRecipes: false,
      hasMore: false,
    });
  });

  test('should handle CLEAR_RECIPES', () => {
    expect(recipeReducer(initialState, {
      type: CLEAR_RECIPES,
    })).toEqual({
      error: '',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: false,
      hasMore: true,
    });

    expect(recipeReducer({
      error: '',
      recipes: [
        {
          publisher: 'Healthy Delicious',
          f2f_url: 'http://food2fork.com/view/0c2e90',
          title: 'Baked Chicken and Spinach Flautas',
          source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
          recipe_id: '0c2e90',
          image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
          social_rank: 100,
          publisher_url: 'http://www.healthy-delicious.com',
        },
      ],
      nextPage: 2,
      isLoadingRecipes: false,
      hasMore: true,
    }, {
      type: CLEAR_RECIPES,
    })).toEqual({
      error: '',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: false,
      hasMore: true,
    });

    expect(recipeReducer({
      error: '',
      recipes: [
        {
          publisher: 'Healthy Delicious',
          f2f_url: 'http://food2fork.com/view/0c2e90',
          title: 'Baked Chicken and Spinach Flautas',
          source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
          recipe_id: '0c2e90',
          image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
          social_rank: 100,
          publisher_url: 'http://www.healthy-delicious.com',
        },
      ],
      nextPage: 2,
      isLoadingRecipes: false,
      hasMore: false,
    }, {
      type: CLEAR_RECIPES,
    })).toEqual({
      error: '',
      recipes: [],
      nextPage: 1,
      isLoadingRecipes: false,
      hasMore: true,
    });
  });
});
