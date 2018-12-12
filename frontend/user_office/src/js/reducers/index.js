import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import {UserReducer} from 'js/reducers/UserReducer';
import {ICOInfoReducer} from 'js/reducers/ICOInfoReducer';
import {DepositsReducer} from 'js/reducers/DepositsReducer';
import {BountiesBalanceReducer} from 'js/reducers/BountiesBalanceReducer';
import {KYCReducer} from 'js/reducers/KYCReducer';
import {InvestReducer} from 'js/reducers/InvestReducer.js';
import {ReferralsReducer} from 'js/reducers/ReferralsReducer.js';
import {PhasesReducer} from 'js/reducers/PhasesReducer.js';
import {CurrencyReducer} from 'js/reducers/CurrencyReducer.js';
import {TimerReducer} from 'js/reducers/TimerReducer.js';
import {UIStateReducer} from 'js/reducers/UIStateReducer.js';
import {MetamaskReducer} from 'js/reducers/MetamaskReducer.js';
import {TicketsReducer} from "js/reducers/TicketReducer.js";
import {FilesReducer} from "js/reducers/FilesReducer.js";
import { routerReducer } from 'react-router-redux'


const reducers = combineReducers({
    user: UserReducer,
    ICOInfo: ICOInfoReducer,
    deposits: DepositsReducer,
    bountiesBalance: BountiesBalanceReducer,
    KYC: KYCReducer,
    Invest: InvestReducer,
    referrals: ReferralsReducer,
    Phase: PhasesReducer,
    Currencies: CurrencyReducer,
    Timer: TimerReducer,
    UI: UIStateReducer,
    Metamask: MetamaskReducer,
    form: formReducer,
    router: routerReducer,
    tickets: TicketsReducer,
    Files: FilesReducer
})


export default reducers;
