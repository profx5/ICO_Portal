import React from 'react';
import {configure, shallow} from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';

import FieldTextSpan from 'js/components/account/stateless/FieldTextSpan';


configure({ adapter: new Adapter() });

it('should render stateless FieldTextSpan', () => {
    const props = {
        tabClickHandler: jest.fn(),
        ticketsAmount: 0
    }
    const component = shallow(<FieldTextSpan {...props}/>);
    expect(component).toMatchSnapshot();
})
