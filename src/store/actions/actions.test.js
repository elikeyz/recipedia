import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getRecipes, clearRecipes } from './index';
import {
  GET_RECIPES_STARTED,
  GET_RECIPES_SUCCESS,
  GET_RECIPES_FAILED,
  CLEAR_RECIPES,
  MARK_RECIPES_END,
} from '../constants';

const mockStore = configureMockStore([thunk]);

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

describe('Recipes Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  test('should dispatch GET_RECIPES_SUCCESS action when recipes are gotten from the server sucessfully', async () => {
    moxios.stubRequest('https://www.food2fork.com/api/search?key=621e010c24b40e6f096a1508a90aa823&q=salsa&page=1&sort=r', {
      status: 200,
      response: {
        recipes,
      },
    });

    const expectedActions = [
      { type: GET_RECIPES_STARTED },
      { type: GET_RECIPES_SUCCESS, recipes },
    ];

    const store = mockStore(initialState);
    await store.dispatch(getRecipes('salsa', 1, 'r'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should dispatch MARK_RECIPES_END action when the server returns no recipes for the query', async () => {
    moxios.stubRequest('https://www.food2fork.com/api/search?key=621e010c24b40e6f096a1508a90aa823&q=salsa&page=1&sort=r', {
      status: 200,
      response: {
        recipes: [],
      },
    });

    const expectedActions = [
      { type: GET_RECIPES_STARTED },
      { type: GET_RECIPES_SUCCESS, recipes: [] },
      { type: MARK_RECIPES_END },
    ];

    const store = mockStore(initialState);
    await store.dispatch(getRecipes('salsa', 1, 'r'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should dispatch GET_RECIPES_FAILED when the server request fails', async () => {
    moxios.stubRequest('https://www.food2fork.com/api/search?key=621e010c24b40e6f096a1508a90aa823&q=salsa&page=1&sort=r', {
      status: 400,
      response: {
        message: 'Request failed',
      },
    });

    const expectedActions = [
      { type: GET_RECIPES_STARTED },
      { type: GET_RECIPES_FAILED, error: 'Request failed with status code 400' },
    ];

    const store = mockStore(initialState);
    await store.dispatch(getRecipes('salsa', 1, 'r'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should dispatch CLEAR_RECIPES', () => {
    const expectedActions = [
      { type: CLEAR_RECIPES },
    ];

    const store = mockStore({ ...initialState, recipes });
    store.dispatch(clearRecipes());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
