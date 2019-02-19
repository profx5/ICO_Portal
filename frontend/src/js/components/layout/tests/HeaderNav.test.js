import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeaderNav from 'js/components/layout/stateless/HeaderNav';


configure({ adapter: new Adapter() });

it('should render stateless HeaderNav', () => {
    const component = shallow(<HeaderNav/>);
    expect(component).toMatchSnapshot();
})
