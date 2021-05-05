import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies/index.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT;
const swaggerDocument = yaml.load(fs.readFileSync('./movie-api-yaml/swagger.yaml', 'utf8'));

app.use(express.json());

app.use('/api/movies', moviesRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});