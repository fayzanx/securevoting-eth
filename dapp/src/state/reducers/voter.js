import { VOTER_GET_SUCCESS, VOTER_RESET } from '../../constants/actionTypes'

const voterReducer = ( state = {}, action ) => {
    switch( action.type ){
        case VOTER_GET_SUCCESS:
            return action.payload
        case VOTER_RESET:
            return {}
        default:
            return state
    }
}

export default voterReducer