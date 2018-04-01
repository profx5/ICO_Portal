import {combineReducers} from 'redux'
//reducers
import {UserReducer} from './UserReducer'
import {ICOInfoReducer} from './ICOInfoReducer'
import {DepositsReducer} from './DepositsReducer'
import {BountiesBalanceReducer} from './BountiesBalanceReducer'
import {KYCReducer} from './KYCReducer'
import {InvestReducer} from './InvestReducer.js'
import {ReferalsReducer} from './ReferalsReducer.js'
import {ModalWindowReducer} from './ModalWindowReducer.js'

const reducer = combineReducers({
    user: UserReducer,
    ICOInfo: ICOInfoReducer,
    deposits: DepositsReducer,
    bountiesBalance: BountiesBalanceReducer,
    KYC: KYCReducer,
    Invest: InvestReducer,
    referals: ReferalsReducer,
    modals: ModalWindowReducer
})

export default reducer
