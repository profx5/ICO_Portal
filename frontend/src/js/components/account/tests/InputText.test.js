import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InputText from 'js/components/account/stateless/InputText';


configure({ adapter: new Adapter() });

it('should render stateless InputText', () => {
    const props = {
        errors: {
            name: ''
        }
    }
    const component = shallow(<InputText {...props}/>);
    expect(component).toMatchSnapshot();
})
