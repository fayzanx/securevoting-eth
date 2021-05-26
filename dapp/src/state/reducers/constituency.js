import { CONSTITUENCY_GET_ALL_SUCCESS, CONSTITUENCY_GET_ONE_SUCCESS } from '../../constants/actionTypes'

const cosntituencyReducer = ( constituencies=[], action ) => {
    switch( action.type ){
        case CONSTITUENCY_GET_ALL_SUCCESS: 
            return action.payload
        case CONSTITUENCY_GET_ONE_SUCCESS:
            return [...constituencies, action.payload]
        default:
            return constituencies
    }
}

export default cosntituencyReducer