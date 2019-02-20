import React from 'react';
import {configure, shallow} from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';

import Ticket from 'js/components/support/stateless/Ticket';


configure({ adapter: new Adapter() });

it('should render stateless Ticket', () => {
    const props = {
        onClickHandler: jest.fn()
    }
    const component = shallow(<Ticket {...props}/>);
    expect(component).toMatchSnapshot();
})
