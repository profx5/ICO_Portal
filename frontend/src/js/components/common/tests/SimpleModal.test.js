import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SimpleModal from 'js/components/common/SimpleModal';


configure({ adapter: new Adapter() });

it('should render stateless SimpleModal', () => {

    const props = {
        hideModal: jest.fn(),
        clearModalInfo: jest.fn()
    }

    const component = shallow(<SimpleModal {...props}/>);
    expect(component).toMatchSnapshot();
})
