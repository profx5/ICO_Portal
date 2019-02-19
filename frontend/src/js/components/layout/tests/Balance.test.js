import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Balance from 'js/components/layout/stateless/Balance';


configure({ adapter: new Adapter() });

it('should render stateless Balance', () => {
    const component = shallow(<Balance/>);
    expect(component).toMatchSnapshot();
})
