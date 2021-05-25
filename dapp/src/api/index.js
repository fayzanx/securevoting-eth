import axios from 'axios'
import {BACKEND_URL} from '../config.js'

export const fetchPersons = () => axios.get(`${BACKEND_URL}/persons`)
export const createPerson = ( newPerson ) => axios.post(`${BACKEND_URL}/persons`, newPerson)
export const updatePerson = ( id, updatedPerson ) => axios.patch(`${BACKEND_URL}/persons/${id}`, updatedPerson)
