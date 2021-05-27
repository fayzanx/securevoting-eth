import { combineReducers } from 'redux'
import loadingReducer from './loading'
import personReducer from './person'
import partyReducer from './party'
import constituencyReducer from './constituency'
import voterReducer from './voter'
import errorReducer from './error'

export default combineReducers({
    loading:        loadingReducer,
    error:          errorReducer,
    people:         personReducer,
    parties:        partyReducer,
    constituencies: constituencyReducer,
    voter:          voterReducer
});