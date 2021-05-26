import express from 'express'
import { getPerson, getPeople, createPerson } from '../controllers/person.js'
const router = express.Router();

router.get('/all', getPeople);
router.get('/:cnic', getPerson);
router.post('/new', createPerson);
//router.patch('/update/:id', updatePerson);

export default router;