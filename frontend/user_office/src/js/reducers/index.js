import {combineReducers} from 'redux';

import {UserReducer} from 'js/reducers/UserReducer';
import {ICOInfoReducer} from 'js/reducers/ICOInfoReducer';
import {DepositsReducer} from 'js/reducers/DepositsReducer';
import {KYCReducer} from 'js/reducers/KYCReducer';
import {InvestReducer} from 'js/reducers/InvestReducer.js';
import {PhasesReducer} from 'js/reducers/PhasesReducer.js';
import {CurrencyReducer} from 'js/reducers/CurrencyReducer.js';
import {TimerReducer} from 'js/reducers/TimerReducer.js';
import {UIStateReducer} from 'js/reducers/UIStateReducer.js';
import {TicketsReducer} from "js/reducers/TicketReducer.js";
import {FilesReducer} from "js/reducers/FilesReducer.js";
import { routerReducer } from 'react-router-redux'


const reducers = combineReducers({
    user: UserReducer,
    ICOInfo: ICOInfoReducer,
    deposits: DepositsReducer,
    KYC: KYCReducer,
    Invest: InvestReducer,
    Phase: PhasesReducer,
    Currencies: CurrencyReducer,
    Timer: TimerReducer,
    UI: UIStateReducer,
    router: routerReducer,
    tickets: TicketsReducer,
    Files: FilesReducer
})


export default reducers;
