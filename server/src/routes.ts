import { Router } from 'express';
import { careersRouter } from './modules/careers/careers.routes.js';
import { contentRouter } from './modules/content/content.routes.js';
import { healthRouter } from './modules/health/health.routes.js';
import { leadsRouter } from './modules/leads/leads.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/content', contentRouter);
apiRouter.use('/careers', careersRouter);
apiRouter.use('/leads', leadsRouter);
