import userModel from '../api/users/userModel.js';
import movieModel from '../api/movies/movieModel.js';
import genreModel from '../api/genres/genreModel.js';
import { movies } from './movies.js';
import { users } from './users.js';
import { genres } from './genres.js';


// deletes all user documents in collection and inserts test data
async function loadUsers() {
  try {

    await userModel.deleteMany();
    await userModel.collection.insertMany(users);
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
    console.info(`${movies.length} Movies were successfully stored.`);
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
}