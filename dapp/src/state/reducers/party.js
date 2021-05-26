import { PARTY_GET_ONE_SUCCESS, PARTY_GET_ALL_SUCCESS } from '../../constants/actionTypes'

const partyReducer = ( parties=[], action ) => {
    switch( action.type ){
        case PARTY_GET_ALL_SUCCESS:
            return action.payload
        case PARTY_GET_ONE_SUCCESS:
            return [...parties, action.payload]
        default:
            return parties
    }
}

export default partyReducer