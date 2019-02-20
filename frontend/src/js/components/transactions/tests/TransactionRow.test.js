import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TransactionRow from 'js/components/transactions/stateless/TransactionRow';


configure({ adapter: new Adapter() });

it('should render stateless TransactionRow', () => {
    const component = shallow(<TransactionRow/>);
    expect(component).toMatchSnapshot();
})
