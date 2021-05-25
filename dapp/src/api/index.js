import axios from 'axios'
import {BACKEND_URL} from '../config.js'

export const fetchPersons = () => axios.get(BACKEND_URL + 'persons')
