import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TransactionInfo from 'js/components/transactions/stateless/TransactionInfo';


configure({ adapter: new Adapter() });

it('should render stateless TransactionInfo', () => {
    const component = shallow(<TransactionInfo/>);
    expect(component).toMatchSnapshot();
})
