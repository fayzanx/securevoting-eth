import axios from 'axios'
import {BACKEND_URL} from '../config.js'

export const fetchPeople  = () => axios.get(`${BACKEND_URL}/person/all`)
export const fetchPerson  = ( cnic ) => axios.get(`${BACKEND_URL}/person/${cnic}`)
// export const createPerson = ( newPerson ) => axios.post(`${BACKEND_URL}/person/new`, newPerson)
// export const updatePerson = ( id, updatedPerson ) => axios.patch(`${BACKEND_URL}/person/update/${id}`, updatedPerson)

export const fetchParties = () => axios.get(`${BACKEND_URL}/party/all`)
export const fetchParty  = ( cnic ) => axios.get(`${BACKEND_URL}/party/${cnic}`)

export const fetchConstituencies = () => axios.get(`${BACKEND_URL}/constituency/all`)
export const fetchConstituency   = ( cnic ) => axios.get(`${BACKEND_URL}/constituency/${cnic}`)