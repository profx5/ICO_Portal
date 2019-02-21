import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorMessage from 'js/components/common/ErrorMessage';


configure({ adapter: new Adapter() });

it('should render stateless ErrorMessage', () => {
    const component = shallow(<ErrorMessage/>);
    expect(component).toMatchSnapshot();
})
