import React from 'react';
import {configure, shallow} from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';

import InputLabel from 'js/components/account/stateless/InputLabel';


configure({ adapter: new Adapter() });

it('should render stateless InputLabel', () => {
    const props = {
        onClickHandler: jest.fn()
    }
    const component = shallow(<InputLabel {...props}/>);
    expect(component).toMatchSnapshot();
})
