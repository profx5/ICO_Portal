import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProgressBar from 'js/components/dashboard/stateless/ProgressBar';


configure({ adapter: new Adapter() });

it('should render stateless ProgressBar', () => {
    const component = shallow(<ProgressBar/>);
    expect(component).toMatchSnapshot();
})
