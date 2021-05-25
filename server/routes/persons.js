import express from 'express'
import { getPersons, createPerson, updatePerson } from '../controllers/persons.js'
const router = express.Router();

router.get('/', getPersons);
router.post('/', createPerson);
router.patch('/:id', updatePerson);

export default router;