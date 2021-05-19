import userModel from '../api/users/userModel.js';
import movieModel from '../api/movies/movieModel.js';
import genreModel from '../api/genres/genreModel.js';
import upcomingMovieModel from '../api/movies/upcomingMovieModel.js'
import topRatedMovieModel from '../api/movies/topRatedMovieModel.js'
import { movies } from './movies.js';
import { users } from './users.js';
import { genres } from './genres.js';
import { upcomingMovies} from './upcomingMovies.js';
import { topRatedMovies } from './topRatedMovies.js';


// deletes all user documents in collection and inserts test data
async function loadUsers() {
  try {
    await userModel.collection.drop();
    users.forEach(user =>  userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
async function loadMovies() {
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

async function loadUpcomingMovies() {
  try {
    await upcomingMovieModel.deleteMany();
    await upcomingMovieModel.collection.insertMany(upcomingMovies);
    console.info(`${upcomingMovies.length} upcoming movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

async function loadTopRatedMovies() {
  try {
    await topRatedMovieModel.deleteMany();
    await topRatedMovieModel.collection.insertMany(topRatedMovies);
    console.info(`${topRatedMovies.length} top rated movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

// deletes all genre documents in collection and inserts test data
async function loadGenres() {
  try {
    await genreModel.deleteMany();
    await genreModel.collection.insertMany(genres);
    console.info(`${genres.length} Genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genre Data: ${err}`);
  }
}

if (process.env.seedDb) {
  loadUsers();
  loadMovies();
  loadGenres();
  loadUpcomingMovies();
  loadTopRatedMovies();
}