import React from 'react';
import {configure, shallow} from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';

import SupportTabs from 'js/components/support/stateless/SupportTabs';


configure({ adapter: new Adapter() });

it('should render stateless SupportTabs', () => {
    const props = {
        tabClickHandler: jest.fn(),
        ticketsAmount: 0
    }
    const component = shallow(<SupportTabs {...props}/>);
    expect(component).toMatchSnapshot();
})
