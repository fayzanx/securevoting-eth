import express from 'express'
import { getConstituencies, getConstituency, createConstituency } from '../controllers/constituency.js'
const router = express.Router();

router.get('/all', getConstituencies);
router.get('/:id', getConstituency);
router.post('/new', createConstituency);

export default router;