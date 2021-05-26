import { PERSON_FETCH_ALL, PERSON_FETCH_ONE } from '../../constants/actionTypes'
import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getPeople = () => async (dispatch) => {
    try {
        
        const { data } = await api.fetchPeople()
        dispatch({ type: PERSON_FETCH_ALL, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}

export const getPerson = ( cnic ) => async (dispatch) => {
    try {

        const { data } = await api.fetchPerson( cnic )
        dispatch({ type: PERSON_FETCH_ONE, payload: data })
    
    } catch (error) {
        console.log( error )
    }

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