import React from 'react';
import {configure, shallow} from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';

import Nav from 'js/components/layout/stateless/Nav';


configure({ adapter: new Adapter() });

it('should render stateless Nav', () => {
    const props = {
        changeSupportActiveTab: jest.fn()
    }
    const component = shallow(<Nav changeSupportActiveTab={props.changeSupportActiveTab}/>);
    expect(component).toMatchSnapshot();
})
