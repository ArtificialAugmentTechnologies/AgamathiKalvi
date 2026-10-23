import { Router } from 'express';
import { careersRouter } from './modules/careers/careers.routes.js';
import { contentRouter } from './modules/content/content.routes.js';
import { healthRouter } from './modules/health/health.routes.js';
import { leadsRouter } from './modules/leads/leads.routes.js';
import { quizRouter } from './modules/quiz/quiz.routes.js';
import { scholarshipsRouter } from './modules/scholarships/scholarships.routes.js';
import { toolsRouter } from './modules/tools/tools.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/content', contentRouter);
apiRouter.use('/careers', careersRouter);
apiRouter.use('/leads', leadsRouter);
apiRouter.use('/tools', toolsRouter);
apiRouter.use('/scholarships', scholarshipsRouter);
apiRouter.use('/quiz', quizRouter);
