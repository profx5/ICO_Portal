import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Title from 'js/components/common/Title';


configure({ adapter: new Adapter() });

it('should render stateless Title', () => {
    const component = shallow(<Title/>);
    expect(component).toMatchSnapshot();
})
