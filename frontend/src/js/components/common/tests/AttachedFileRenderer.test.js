import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AttachedFileRenderer from 'js/components/common/AttachedFileRenderer';


configure({ adapter: new Adapter() });

it('should render stateless AttachedFileRenderer', () => {

    const props = {
        files: [],
        removeFileHandler: jest.fn()
    }

    const component = shallow(<AttachedFileRenderer {...props}/>);
    expect(component).toMatchSnapshot();
})
