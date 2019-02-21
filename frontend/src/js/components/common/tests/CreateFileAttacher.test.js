import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreateFileAttacher from 'js/components/common/CreateFileAttacher';


configure({ adapter: new Adapter() });

it('should render stateless CreateFileAttacher', () => {

    const props = {
        name: 'name',
        fileWrapper: <div/>,
        uploadFileHandler: jest.fn()
    }

    const component = shallow(<CreateFileAttacher {...props}/>);
    expect(component).toMatchSnapshot();
})
