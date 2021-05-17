import express from 'express';
import movieModel from './movieModel.js';
import asyncHandler from 'express-async-handler';
import { NotFound } from './../../responses/index.js';

const router = express.Router();

router.get('/', async (req, res) => {

    let { page = 1, limit = 4 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
});

// Get movie details
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await movieModel.findById(id).exec();
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json(NotFound);
    }
});

// Get movie reviews
router.get('/:id/reviews', async (req, res) => {
    const id = req.params.id;
    const movie = await movieModel.findById(id).exec();
    if (movie.reviews) {
        res.status(200).json(movie.reviews);
    } else {
        res.status(404).json(NotFound);
    }
});

export default router;