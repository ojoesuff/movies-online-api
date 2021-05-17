import express from 'express';
import asyncHandler from 'express-async-handler';
import Genre from './genreModel.js';

const router = express.Router();

// Get all genres
router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
}));

export default router;