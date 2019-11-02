import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Home Component', () => {
  test('renders', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
