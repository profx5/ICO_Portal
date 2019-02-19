import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Steps from 'js/components/layout/stateless/Steps';


configure({ adapter: new Adapter() });

it('should render stateless Steps', () => {
    const component = shallow(<Steps/>);
    expect(component).toMatchSnapshot();
})
