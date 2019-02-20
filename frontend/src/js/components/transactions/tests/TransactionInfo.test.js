import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TransactionInfo from 'js/components/transactions/stateless/TransactionInfo';


configure({ adapter: new Adapter() });

it('should render stateless TransactionInfo', () => {
    const props = {
        usdc_value: 0
    }
    const component = shallow(<TransactionInfo {...props}/>);

    expect(component).toMatchSnapshot();
})
