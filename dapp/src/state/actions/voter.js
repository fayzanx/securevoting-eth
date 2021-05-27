import {
    VOTER_GET_REQUEST, VOTER_GET_SUCCESS, VOTER_GET_FAILURE, VOTER_RESET
} from '../../constants/actionTypes'

import * as api from '../../api'

/**
 * ACTION CREATORS
 */

export const getVoter = (id) => async (dispatch) => {
    dispatch({ type: VOTER_GET_REQUEST })

    api.fetchPerson(id).then(({ data }) => {

        dispatch({ type: VOTER_GET_SUCCESS, payload: data })

    }).catch(error => {

        console.log(error)
        dispatch({ type: VOTER_GET_FAILURE, payload: error, error: true })

    })
}

export const resetVoter = ( id ) => (dispatch) => {
    dispatch({ type: VOTER_RESET })
}
