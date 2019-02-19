import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PhasesInfo from 'js/components/dashboard/stateless/PhasesInfo';

configure({ adapter: new Adapter() });

it('should render stateless PhasesInfo', () => {
    const component = shallow(<PhasesInfo/>);
    expect(component).toMatchSnapshot();
})
