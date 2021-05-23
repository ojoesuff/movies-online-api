import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieReviewSchema = {
  author: { type: String },
  content: { type: String },
  created_at: {type: Date},
  updated_at: {type: Date}
};

const GenresSchema = {
  id: { type: Number },
  Name: { type: String }
};

export const BasicMovieSchema = new Schema({
  adult: { type: Boolean },
  belongs_to_collection: { type: String },
  budget: { type: Number },
  imdb_id: {type: String},
  homepage: {type: String},
  poster_path: { type: String },
  overview: { type: String },
  release_date: { type: String },
  original_title: { type: String },
  genres: [GenresSchema],
  original_language: { type: String },
  title: { type: String },
  backdrop_path: { type: String },
  popularity: { type: Number },
  vote_count: { type: Number },
  video: { type: Boolean },
  vote_average: { type: Number },
  production_countries: [{
    iso_3166_1: { type: String },
    name: { type: String }
  }],
  reviews: [MovieReviewSchema],
  runtime: { type: Number },
  spoken_languages: [{
    iso_639_1: { type: String },
    name: { type: String }
  }],
  status: { type: String },
  tagline: { type: String }
});

// add movie review
BasicMovieSchema.methods.addReview = function(review) {
  this.reviews.push(review);
  return this.save();
};