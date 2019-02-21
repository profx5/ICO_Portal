import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Countdown from 'js/components/common/Countdown';


configure({ adapter: new Adapter() });

it('should render stateless Countdown', () => {

    const props = {
        startTime: '2018-08-29T15:10:47+00:00',
        endTime: '2018-12-09T15:10:47+00:00'
    }

    const component = shallow(
        <Countdown {...props}>
            {(days, hours, minutes, seconds) => (
                <React.Fragment>{days} {hours} {minutes} {seconds}}</React.Fragment>
            )}
        </Countdown>
    );
    expect(component).toMatchSnapshot();
})
