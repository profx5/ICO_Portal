import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormikField from 'js/components/common/FormikField';


configure({ adapter: new Adapter() });

it('should render stateless FormikField', () => {
    const component = shallow(<FormikField/>);
    expect(component).toMatchSnapshot();
})
