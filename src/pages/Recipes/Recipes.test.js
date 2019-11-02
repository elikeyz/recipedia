/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Recipes } from './index';

Enzyme.configure({ adapter: new Adapter() });

let mockProps;

describe('Recipes Component', () => {
  beforeEach(() => {
    mockProps = {
      getRecipes: jest.fn(),
      clearRecipes: jest.fn(),
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
    };
  });

  test('renders', () => {
    const wrapper = shallow(<Recipes {...mockProps} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  test('sets sortInput state when rating dropdown value is changed', () => {
    const wrapper = mount(<Recipes {...mockProps} />);

    wrapper.find('#sortBy').simulate('change', { target: { value: 't' } });

    expect(wrapper.find('#sortBy').props().value).toEqual('t');
  });

  test('sets searchInput state when search input value is changed', () => {
    const wrapper = mount(<Recipes {...mockProps} />);

    wrapper.find('#search').simulate('change', { target: { value: 'salsa' } });

    expect(wrapper.find('#search').props().value).toEqual('salsa');
  });

  test('cancels event when search form is submitted', () => {
    const wrapper = mount(<Recipes {...mockProps} />);

    let prevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      },
    });

    expect(prevented).toBe(true);
  });
});
