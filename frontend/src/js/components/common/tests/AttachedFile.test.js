import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AttachedFile from 'js/components/common/AttachedFile';


configure({ adapter: new Adapter() });

it('should render stateless AttachedFile', () => {

    const props = {
        removeHandler: jest.fn()
    }

    const component = shallow(<AttachedFile {...props}/>);
    expect(component).toMatchSnapshot();
})
