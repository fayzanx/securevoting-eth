import { FETCH_ALL, UPDATE, CREATE } from '../../constants/actionTypes'

const personsReducer = ( persons=[], action ) => {
    switch( action.type ){
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...persons, action.payload]
        case UPDATE:
            return persons.map((person) => person._id === action.payload._id ? action.payload : person)
        default:
            return persons
    }
}

export default personsReducer