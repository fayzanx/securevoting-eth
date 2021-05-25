import express from 'express'
import { getParties, getParty, createParty } from '../controllers/party.js'
const router = express.Router();

router.get('/', getParties);
router.get('/:id', getParty);
router.post('/', createParty);

export default router;