import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { isProd } from '../env.js';
import { HttpError } from '../lib/http-error.js';

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation failed', details: err.flatten() });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }
  console.error(err);
  res.status(500).json({ error: isProd ? 'Internal server error' : String(err?.message ?? err) });
};
