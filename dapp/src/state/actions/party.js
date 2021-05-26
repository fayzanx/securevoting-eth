import { PARTY_FETCH_ALL, PARTY_FETCH_ONE } from '../../constants/actionTypes'
import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getParties = () => async (dispatch) => {
    try {
        
        const { data } = await api.fetchParties()
        dispatch({ type: PARTY_FETCH_ALL, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}

export const getParty = ( cnic ) => async (dispatch) => {
    try {

        const { data } = await api.fetchParty( cnic )
        dispatch({ type: PARTY_FETCH_ONE, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}
