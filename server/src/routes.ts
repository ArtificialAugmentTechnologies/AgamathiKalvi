import { Router } from 'express';
import { attachUser, requireJson } from './middleware/auth.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { bookingsRouter, slotsRouter } from './modules/bookings/bookings.routes.js';
import { careersRouter } from './modules/careers/careers.routes.js';
import { contentRouter } from './modules/content/content.routes.js';
import { healthRouter } from './modules/health/health.routes.js';
import { leadsRouter } from './modules/leads/leads.routes.js';
import { meRouter } from './modules/me/me.routes.js';
import { quizRouter } from './modules/quiz/quiz.routes.js';
import { scholarshipsRouter } from './modules/scholarships/scholarships.routes.js';
import { toolsRouter } from './modules/tools/tools.routes.js';

export const apiRouter = Router();

// Every API request: JSON-only writes (CSRF defence) and the signed-in user, if any.
apiRouter.use(requireJson);
apiRouter.use(attachUser);

apiRouter.use('/health', healthRouter);
apiRouter.use('/content', contentRouter);
apiRouter.use('/careers', careersRouter);
apiRouter.use('/leads', leadsRouter);
apiRouter.use('/tools', toolsRouter);
apiRouter.use('/scholarships', scholarshipsRouter);
apiRouter.use('/quiz', quizRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/me', meRouter);
apiRouter.use('/slots', slotsRouter);
apiRouter.use('/bookings', bookingsRouter);
