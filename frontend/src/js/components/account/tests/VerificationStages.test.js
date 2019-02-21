import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VerificationStages from 'js/components/account/stateless/VerificationStages';


configure({ adapter: new Adapter() });

it('should render stateless VerificationStages', () => {
    const props = {
        boundSections: [],
        stages: []
    }
    const component = shallow(<VerificationStages {...props}/>);
    expect(component).toMatchSnapshot();
})
