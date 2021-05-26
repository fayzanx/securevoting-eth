import {
    CONSTITUENCY_GET_ALL_REQUEST, CONSTITUENCY_GET_ALL_SUCCESS, CONSTITUENCY_GET_ALL_FAILURE,
    CONSTITUENCY_GET_ONE_REQUEST, CONSTITUENCY_GET_ONE_SUCCESS, CONSTITUENCY_GET_ONE_FAILURE
} from '../../constants/actionTypes'
import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getConstituencies = () => async (dispatch) => {
    dispatch({ type: CONSTITUENCY_GET_ALL_REQUEST })

    api.fetchConstituencies().then(({ data }) => {

        dispatch({ type: CONSTITUENCY_GET_ALL_SUCCESS, payload: data })

    }).catch((error) => {

        console.log(error)
        dispatch({ type: CONSTITUENCY_GET_ALL_FAILURE })

    })
}

export const getConstituency = ( id ) => async (dispatch) => {
    dispatch({ type: CONSTITUENCY_GET_ONE_REQUEST })

    api.fetchConstituency(id).then(({ data }) => {

        dispatch({ type: CONSTITUENCY_GET_ONE_SUCCESS, payload: data })

    }).catch(error => {

        console.log(error)
        dispatch({ type: CONSTITUENCY_GET_ONE_FAILURE })

    })
}