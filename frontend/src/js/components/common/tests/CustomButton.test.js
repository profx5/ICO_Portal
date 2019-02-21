import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CustomButton from 'js/components/common/CustomButton';


configure({ adapter: new Adapter() });

it('should render stateless CustomButton', () => {

    const props = {
        clickHandler: jest.fn()
    }

    const component = shallow(<CustomButton {...props}/>);
    expect(component).toMatchSnapshot();
})
