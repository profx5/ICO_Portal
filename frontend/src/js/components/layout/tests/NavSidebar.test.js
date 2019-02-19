import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavSidebar from 'js/components/layout/stateless/NavSidebar';


configure({ adapter: new Adapter() });

it('should render stateless NavSidebar', () => {
    const component = shallow(<NavSidebar/>);
    expect(component).toMatchSnapshot();
})
