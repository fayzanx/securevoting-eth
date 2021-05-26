import { combineReducers } from 'redux'
import loadingReducer from './loading'
import personReducer from './person'
import partyReducer from './party'
import constituencyReducer from './constituency'

export default combineReducers({
    loading: loadingReducer,
    person: personReducer,
    party: partyReducer,
    constituency: constituencyReducer,
});