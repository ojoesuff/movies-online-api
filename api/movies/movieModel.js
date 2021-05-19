import mongoose from 'mongoose';
import { BasicMovieSchema } from './movieSchema.js'

const MovieSchema = BasicMovieSchema;

MovieSchema.statics.findByMovieDBId = id => {
  return this.findOne({ id: id });
};

export default mongoose.model('Movie', MovieSchema);