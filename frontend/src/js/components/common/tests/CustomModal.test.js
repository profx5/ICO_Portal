import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CustomModal from 'js/components/common/CustomModal';


configure({ adapter: new Adapter() });

it('should render stateless CustomModal', () => {

    const props = {
        modalOpened: false,
        hideModal: jest.fn()
    }

    const component = shallow(<CustomModal/>);
    expect(component).toMatchSnapshot();
})
