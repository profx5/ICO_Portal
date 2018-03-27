import {combineReducers} from 'redux'

//reducers
import {UserReducer} from './UserReducer'
import {ICOInfoReducer} from './ICOInfoReducer'
import {DepositsReducer} from './DepositsReducer'
import {BountiesBalanceReducer} from './BountiesBalanceReducer'
import {KYCReducer} from './KYCReducer'
import {InvestReducer} from './InvestReducer.js'

const reducer = combineReducers({
    user: UserReducer,
    ICOInfo: ICOInfoReducer,
    deposits: DepositsReducer,
    bountiesBalance: BountiesBalanceReducer,
    KYC: KYCReducer,
    Invest: InvestReducer
})

export default reducer
