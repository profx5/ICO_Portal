import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dropdown from 'js/components/layout/stateless/Dropdown';


configure({ adapter: new Adapter() });

it('should render stateless Dropdown', () => {
    const component = shallow(<Dropdown/>);
    expect(component).toMatchSnapshot();
})
