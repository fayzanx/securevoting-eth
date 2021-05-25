import express from 'express'
import { getConstituencies, getConstituency, createConstituency } from '../controllers/constituency.js'
const router = express.Router();

router.get('/', getConstituencies);
router.get('/:id', getConstituency);
router.post('/', createConstituency);

export default router;