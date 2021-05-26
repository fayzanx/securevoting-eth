import { FETCH_ALL, UPDATE, CREATE } from '../../constants/actionTypes'
import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getPeople = () => async (dispatch) => {
    try {
        
        const { data } = await api.fetchPeople()
        dispatch({ type: FETCH_ALL, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}

export const createPerson = (person) => async (dispatch) => {
    try {
        
        const { data } = await api.createPerson( person )
        dispatch({ type: CREATE, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}

export const updatePerson = (id, person) => async (dispatch) => {
    try {
        
        const { data } = await api.updatePerson(id, person)
        dispatch({ type: UPDATE, payload: data })
    
    } catch (error) {
        console.log( error )
    }

}