import {combineReducers} from 'redux';
//reducers
import {UserReducer} from './UserReducer';
import {ICOInfoReducer} from './ICOInfoReducer';
import {DepositsReducer} from './DepositsReducer';
import {BountiesBalanceReducer} from './BountiesBalanceReducer';
import {KYCReducer} from './KYCReducer';
import {InvestReducer} from './InvestReducer.js';
import {ReferralsReducer} from './ReferralsReducer.js';
import {ModalWindowReducer} from './ModalWindowReducer.js';
import {PhaseReducer} from './PhaseReducer.js';
import {CurrencyReducer} from './CurrencyReducer.js';
import {TimerReducer} from './TimerReducer.js';
import {UIStateReducer} from './UIStateReducer.js';
import {MetamaskReducer} from './MetamaskReducer.js';

const reducers = combineReducers({
    user: UserReducer,
    ICOInfo: ICOInfoReducer,
    deposits: DepositsReducer,
    bountiesBalance: BountiesBalanceReducer,
    KYC: KYCReducer,
    Invest: InvestReducer,
    referrals: ReferralsReducer,
    modals: ModalWindowReducer,
    Phase: PhaseReducer,
    Currencies: CurrencyReducer,
    Timer: TimerReducer,
    UI: UIStateReducer,
    Metamask: MetamaskReducer,
})

export default reducers;
