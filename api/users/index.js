import express from 'express';
import User from './userModel.js';
import { NotFound } from './../../responses/index.js';
import asyncHandler from 'express-async-handler';

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



export default router;