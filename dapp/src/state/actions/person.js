import {
    PERSON_GET_ALL_REQUEST, PERSON_GET_ALL_SUCCESS, PERSON_GET_ALL_FAILURE,
    PERSON_GET_ONE_REQUEST, PERSON_GET_ONE_SUCCESS, PERSON_GET_ONE_FAILURE
} from '../../constants/actionTypes'
import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getPeople = () => async (dispatch) => {
    dispatch({ type: PERSON_GET_ALL_REQUEST })

    api.fetchPeople().then(({ data }) => {

        dispatch({ type: PERSON_GET_ALL_SUCCESS, payload: data })

    }).catch((error) => {

        console.log(error)
        dispatch({ type: PERSON_GET_ALL_FAILURE, payload: error, error: true })

    })
}

export const getPerson = ( cnic ) => async (dispatch) => {
    dispatch({ type: PERSON_GET_ONE_REQUEST })

    api.fetchPerson( cnic ).then(({ data }) => {

        dispatch({ type: PERSON_GET_ONE_SUCCESS, payload: data })

    }).catch(error => {

        console.log(error)
        dispatch({ type: PERSON_GET_ONE_FAILURE, payload: error, error: true })

    })
}

// export const createPerson = (person) => async (dispatch) => {
//     try {
        
//         const { data } = await api.createPerson( person )
//         dispatch({ type: PERSON_CREATE, payload: data })
    
//     } catch (error) {
//         console.log( error )
//     }

// }

// export const updatePerson = (id, person) => async (dispatch) => {
//     try {
        
//         const { data } = await api.updatePerson(id, person)
//         dispatch({ type: PERSON_UPDATE, payload: data })
    
//     } catch (error) {
//         console.log( error )
//     }

// }