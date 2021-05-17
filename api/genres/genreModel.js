import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GenreSchema =  new Schema({
  id: { type: Number },
  name: { type: String }
});

export default mongoose.model('Genre', GenreSchema);