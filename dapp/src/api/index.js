import axios from 'axios'
import {BACKEND_URL} from '../config.js'

export const fetchPeople = () => axios.get(`${BACKEND_URL}/person`)
export const fetchPerson = ( cnic ) => axios.get(`${BACKEND_URL}/person/${cnic}`)
export const createPerson = ( newPerson ) => axios.post(`${BACKEND_URL}/person`, newPerson)
export const updatePerson = ( id, updatedPerson ) => axios.patch(`${BACKEND_URL}/person/${id}`, updatedPerson)
