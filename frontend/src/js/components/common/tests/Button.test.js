import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from 'js/components/common/Button';


configure({ adapter: new Adapter() });

it('should render stateless Button', () => {

    const props = {
        clickHandler: jest.fn()
    }

    const component = shallow(<Button {...props}/>);
    expect(component).toMatchSnapshot();
})
