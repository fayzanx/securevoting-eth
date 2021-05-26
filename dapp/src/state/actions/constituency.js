import { CONSTITUENCY_FETCH_ALL, CONSTITUENCY_FETCH_ONE } from '../../constants/actionTypes'
import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getConstituencies = () => async (dispatch) => {
    try {
        
        const { data } = await api.fetchConstituencies()
        dispatch({ type: CONSTITUENCY_FETCH_ALL, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}

export const getConstituency = ( cnic ) => async (dispatch) => {
    try {

        const { data } = await api.fetchConstituency( cnic )
        dispatch({ type: CONSTITUENCY_FETCH_ONE, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}
