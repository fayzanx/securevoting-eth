import {
    PARTY_GET_ALL_REQUEST, PARTY_GET_ALL_SUCCESS, PARTY_GET_ALL_FAILURE,
    PARTY_GET_ONE_REQUEST, PARTY_GET_ONE_SUCCESS, PARTY_GET_ONE_FAILURE
} from '../../constants/actionTypes'

import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getParties = () => async (dispatch) => {
    dispatch({ type: PARTY_GET_ALL_REQUEST })

    api.fetchParties().then(({ data }) => {

        dispatch({ type: PARTY_GET_ALL_SUCCESS, payload: data })

    }).catch((error) => {

        console.log(error)
        dispatch({ type: PARTY_GET_ALL_FAILURE })

    })
}

export const getParty = (id) => async (dispatch) => {
    dispatch({ type: PARTY_GET_ONE_REQUEST })

    api.fetchParty(id).then(({ data }) => {

        dispatch({ type: PARTY_GET_ONE_SUCCESS, payload: data })

    }).catch(error => {

        console.log(error)
        dispatch({ type: PARTY_GET_ONE_FAILURE })

    })
}
