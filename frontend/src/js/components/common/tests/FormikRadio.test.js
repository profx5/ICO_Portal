import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormikRadio from 'js/components/common/FormikRadio';


configure({ adapter: new Adapter() });

it('should render stateless FormikRadio', () => {

    const props = {
        options: []
    }

    const component = shallow(<FormikRadio {...props}/>);
    expect(component).toMatchSnapshot();
})
