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