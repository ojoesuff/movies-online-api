import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData.js';

const router = express.Router(); 
router.get('/', (req, res) => {
    res.json(movies);
});

export default router;