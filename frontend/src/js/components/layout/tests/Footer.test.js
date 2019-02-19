import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from 'js/components/layout/stateless/Footer';


configure({ adapter: new Adapter() });

it('should render stateless Footer', () => {
    const component = shallow(<Footer/>);
    expect(component).toMatchSnapshot();
})
