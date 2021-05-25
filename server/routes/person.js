import express from 'express'
import { getPerson, getPersons, createPerson, updatePerson } from '../controllers/person.js'
const router = express.Router();

router.get('/', getPersons);
router.get('/:cnic', getPerson);
router.post('/', createPerson);
router.patch('/update/:id', updatePerson);

export default router;