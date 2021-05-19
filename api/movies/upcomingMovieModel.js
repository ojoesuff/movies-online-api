import mongoose from 'mongoose';
import { BasicMovieSchema } from "./movieSchema.js"

const UpcomingMovieSchema = BasicMovieSchema;

export default mongoose.model('UpcomingMovie', UpcomingMovieSchema);