import { combineReducers } from 'redux'
import personReducer from './person'
import partyReducer from './party'
import constituencyReducer from './constituency'

export default combineReducers({
    person: personReducer,
    party: partyReducer,
    constituency: constituencyReducer,
});