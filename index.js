import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies/index.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import './db/index.js';
import './seedData/index.js';
import usersRouter from './api/users/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const swaggerDocument = yaml.load(fs.readFileSync('./movie-api-yaml/swagger.yaml', 'utf8'));

app.use(express.json());

app.use('/api/movies', moviesRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Users router
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});