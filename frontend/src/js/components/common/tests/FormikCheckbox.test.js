import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormikCheckbox from 'js/components/common/FormikCheckbox';


configure({ adapter: new Adapter() });

it('should render stateless FormikCheckbox', () => {

    const props = {
        handler: jest.fn(),
        errors: {
            name: 'name'
        }
    }

    const component = shallow(<FormikCheckbox {...props}/>);
    expect(component).toMatchSnapshot();
})
