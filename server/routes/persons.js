import express from 'express'
import { getPersons, createPerson } from '../controllers/persons.js'
const router = express.Router();

router.get('/', getPersons);
router.post('/', createPerson);

export default router;