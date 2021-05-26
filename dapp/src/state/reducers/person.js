import { PERSON_FETCH_ALL, PERSON_FETCH_ONE, PERSON_UPDATE, PERSON_CREATE } from '../../constants/actionTypes'

const personReducer = ( people=[], action ) => {
    switch( action.type ){
        case PERSON_FETCH_ALL:
            return action.payload
        case PERSON_FETCH_ONE:
            return [...people, action.payload]
        case PERSON_CREATE: // not in use
            return [...people, action.payload]
        case PERSON_UPDATE: // not in use
            return people.map((person) => person._id === action.payload._id ? action.payload : person)
        default:
            return people
    }
}

export default personReducer