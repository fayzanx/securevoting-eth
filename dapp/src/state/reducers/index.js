import { combineReducers } from 'redux'
import personReducer from './person'

export default combineReducers({
    person: personReducer,
});