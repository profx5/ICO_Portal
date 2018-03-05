import {combineReducers} from 'redux'

//reducers
import {UserReducer} from './UserReducer'
import {ICOPhasesStatsReducer} from './ICOPhasesStatsReducer'
import {DepositeReducer} from './DepositeReducer'

const reducer = combineReducers({
    user: UserReducer,
    ICOPhases: ICOPhasesStatsReducer,
    deposits: DepositeReducer
})

export default reducer
