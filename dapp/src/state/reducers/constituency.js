import { CONSTITUENCY_FETCH_ALL, CONSTITUENCY_FETCH_ONE } from '../../constants/actionTypes'

const cosntituencyReducer = ( constituencies=[], action ) => {
    switch( action.type ){
        case CONSTITUENCY_FETCH_ALL: 
            return action.payload
        case CONSTITUENCY_FETCH_ONE:
            return [...constituencies, action.payload]
        default:
            return constituencies
    }
}

export default cosntituencyReducer