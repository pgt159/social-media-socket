import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from './utils/appError.js';
import globalErrorHandler from './controller/errorController.js';

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(
  bodyParser.json({
    limit: '30mb',
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '30mb',
    extended: true,
  })
);
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// ERROR HANDLING
app.use('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
