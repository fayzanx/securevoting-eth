import { FETCH_ALL, UPDATE, CREATE } from '../../constants/actionTypes'

const personReducer = ( people=[], action ) => {
    switch( action.type ){
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...people, action.payload]
        case UPDATE:
            return people.map((person) => person._id === action.payload._id ? action.payload : person)
        default:
            return people
    }
}

export default personReducer