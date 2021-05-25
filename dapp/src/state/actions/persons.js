import * as api from '../../api'

/**
 * ACTION CREATORS
 */
export const getPersons = () => async (dispatch) => {
    try {
        
        const { data } = await api.fetchPersons()
        dispatch({ type: 'FETCH_ALL', payload: data })
    
    } catch (error) {
        console.log( error.message )
    }

}

export const createPerson = (person) => async (dispatch) => {
    try {
        
        const { data } = await api.createPerson( person )
        dispatch({ type: 'FETCH_ALL', payload: data })
    
    } catch (error) {
        console.log( error.message )
    }

}

export const updatePerson = (id, person) => async (dispatch) => {
    try {
        
        const { data } = await api.updatePerson(id, person)
        dispatch({ type: 'UPDATE', payload: data })
    
    } catch (error) {
        console.log( error.message )
    }

}