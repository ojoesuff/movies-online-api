import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies/index.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import './db/index.js';
import './seedData/index.js';
import usersRouter from './api/users/index.js';
import genresRouter from './api/genres/index.js';
import passport from './authenicate/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const swaggerDocument = yaml.load(fs.readFileSync('./movie-api-yaml/swagger.yaml', 'utf8'));
// initialise passport​
app.use(passport.initialize());

app.use(express.json());

app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Users router
app.use('/api/users', usersRouter);

//Genres router
app.use('/api/genres', genresRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});