import { PARTY_FETCH_ALL, PARTY_FETCH_ONE } from '../../constants/actionTypes'

const partyReducer = ( parties=[], action ) => {
    switch( action.type ){
        case PARTY_FETCH_ALL:
            return action.payload
        case PARTY_FETCH_ONE:
            return [...parties, action.payload]
        default:
            return parties
    }
}

export default partyReducer