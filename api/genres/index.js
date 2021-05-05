import express from 'express';
import { genres } from './genresData';

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json(genres);
});

export default router;