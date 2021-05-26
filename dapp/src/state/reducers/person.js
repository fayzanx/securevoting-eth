import { PERSON_GET_ALL_SUCCESS, PERSON_GET_ONE_SUCCESS, PERSON_UPDATE, PERSON_CREATE } from '../../constants/actionTypes'

const personReducer = ( people=[], action ) => {
    switch( action.type ){
        case PERSON_GET_ALL_SUCCESS:
            return action.payload
        case PERSON_GET_ONE_SUCCESS:
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