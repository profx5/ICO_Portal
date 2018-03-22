import {combineReducers} from 'redux'

//reducers
import {UserReducer} from './UserReducer'
import {ICOPhaseStatsReducer} from './ICOPhaseStatsReducer'
import {DepositeReducer} from './DepositeReducer'
import {BountiesBalanceReducer} from './BountiesBalanceReducer'
import {KYCReducer} from './KYCReducer'

const reducer = combineReducers({
    user: UserReducer,
    ICOPhaseStats: ICOPhaseStatsReducer,
    deposits: DepositeReducer,
    bountiesBalance: BountiesBalanceReducer,
    KYC: KYCReducer
})

export default reducer
