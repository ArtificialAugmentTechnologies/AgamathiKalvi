import { resolve } from 'node:path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, isProd } from './env.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { apiRouter } from './routes.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  if (env.NODE_ENV !== 'test') app.use(morgan(isProd ? 'combined' : 'dev'));

  app.use('/uploads', express.static(resolve(env.UPLOAD_DIR), { maxAge: '7d' }));
  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
