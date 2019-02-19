import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Timer from 'js/components/dashboard/stateless/Timer';


configure({ adapter: new Adapter() });

it('should render stateless Timer', () => {
    const props = {
        countdownTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }
    const component = shallow(<Timer countdownTime={props.countdownTime}/>);
    expect(component).toMatchSnapshot();
})
