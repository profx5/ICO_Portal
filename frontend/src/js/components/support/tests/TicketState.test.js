import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TicketState from 'js/components/support/stateless/TicketState';


configure({ adapter: new Adapter() });

it('should render stateless TicketState', () => {
    const component = shallow(<TicketState/>);
    expect(component).toMatchSnapshot();
})
