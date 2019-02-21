import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loader from 'js/components/common/Loader';


configure({ adapter: new Adapter() });

it('should render stateless Loader', () => {
    const component = shallow(<Loader/>);
    expect(component).toMatchSnapshot();
})
