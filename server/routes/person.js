import express from 'express'
import { getPerson, getPeople, createPerson } from '../controllers/person.js'
const router = express.Router();

router.get('/', getPeople);
router.get('/:cnic', getPerson);
router.post('/', createPerson);
//router.patch('/update/:id', updatePerson);

export default router;