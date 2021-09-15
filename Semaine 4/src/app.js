import express, { json } from 'express';
import dayjs from 'dayjs';

import database from './libs/database.js';

import methodMiddleware from './middlewares/method.js';
import errorMiddleware from './middlewares/error.js';

import planetesRoutes from './routes/planetes.routes.js';
import elementRoutes from './routes/elements.routes.js';

database();

const app = express();
const OK = 200;

app.use(errorMiddleware);

export default app