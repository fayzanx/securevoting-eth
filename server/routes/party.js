import express from 'express'
import { getParties, getParty, createParty } from '../controllers/party.js'
const router = express.Router();

router.get('/all', getParties);
router.get('/:id', getParty);
router.post('/new', createParty);

export default router;