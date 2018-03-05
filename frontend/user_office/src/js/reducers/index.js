import {combineReducers} from 'redux'

//reducers
import {UserReducer} from './UserReducer'
import {ICOPhasesStatsReducer} from './ICOPhasesStatsReducer'
import {DepositeReducer} from './DepositeReducer'
import {BountiesBalanceReducer} from './BountiesBalanceReducer'

const reducer = combineReducers({
    user: UserReducer,
    ICOPhases: ICOPhasesStatsReducer,
    deposits: DepositeReducer,
    bountiesBalance: BountiesBalanceReducer
})

export default reducer
