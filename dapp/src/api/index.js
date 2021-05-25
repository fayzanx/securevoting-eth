import axios from 'axios'
import {BACKEND_URL} from '../config.js'

export const fetchPersons = () => axios.get(`${BACKEND_URL}/person`)
export const createPerson = ( newPerson ) => axios.post(`${BACKEND_URL}/person`, newPerson)
export const updatePerson = ( id, updatedPerson ) => axios.patch(`${BACKEND_URL}/person/${id}`, updatedPerson)
