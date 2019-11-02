import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RecipeCard from './RecipeCard';

Enzyme.configure({ adapter: new Adapter() });

const mockRecipe = {
  image_url: 'http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg',
  title: 'Baked Chicken and Spinach Flautas',
  source_url: 'http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/',
  f2f_url: 'http://food2fork.com/view/0c2e90',
  publisher: 'Healthy Delicious',
};

describe('Recipe Card Component', () => {
  test('renders', () => {
    const wrapper = shallow(<RecipeCard recipe={mockRecipe} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
