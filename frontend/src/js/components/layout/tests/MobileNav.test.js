import React from 'react';
import {configure, shallow} from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';

import MobileNav from 'js/components/layout/stateless/MobileNav';


configure({ adapter: new Adapter() });

it('should render stateless MobileNav', () => {
    const props = {
        changeSupportActiveTab: jest.fn()
    }
    const component = shallow(<MobileNav changeSupportActiveTab={props.changeSupportActiveTab}/>);
    expect(component).toMatchSnapshot();
})
