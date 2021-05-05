import express from 'express';
import User from './userModel.js';
import { NotFound } from './../../responses/index.js';
import asyncHandler from 'express-async-handler';
import Movie from './../movies/movieModel.js'

const router = express.Router();

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

// register a user
router.post('/', asyncHandler(async (req, res) => {
    await new User(req.body).save();
    res.status(200).json({ success: true, token: "FakeTokenForNow" });
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (user)
        res.json(200, user);
    else
        res.json(404, NotFound);
}));

router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body;
    const userName = req.params.userName;
    if (newFavourite && newFavourite.id) {
        //kick off both async calls at the same time
        const moviePromise = Movie.findById(newFavourite.id);
        const userPromise = User.findByUserName(userName);
        //wait for both promises to return before continuing
        const movie = await moviePromise;
        const user = await userPromise;
        //This wont execute until both the above promises are fulfilled.
        if (movie && user) {
            await user.addFavourite(movie._id);
            res.status(201).json(user);
        }
        else {
            res.status(404).json(NotFound);
        }
    }
    else {
        res.status(422).json({ status_code: 422, message: "unable to process body of request" });
    }
}));

router.get('/:userName/favourites', asyncHandler(async (req, res, next) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    if (user)
        res.status(201).json(user.favourites);
    else
        res.status(404).json(NotFound);
}));


export default router;