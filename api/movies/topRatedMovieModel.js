import mongoose from 'mongoose';
import { BasicMovieSchema } from "./movieSchema.js"

const TopRatedMovieSchema = BasicMovieSchema;

export default mongoose.model('TopRatedMovie', TopRatedMovieSchema);