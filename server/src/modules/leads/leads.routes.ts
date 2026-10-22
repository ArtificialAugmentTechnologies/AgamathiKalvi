import { Router } from 'express';
import { formLimiter } from '../../middleware/rate-limit.js';
import { createLeadSchema } from './leads.schema.js';
import { createLead } from './leads.service.js';

export const leadsRouter = Router();

leadsRouter.post('/', formLimiter, async (req, res) => {
  const input = createLeadSchema.parse(req.body);

  // Honeypot filled → pretend success so bots learn nothing, but store nothing.
  if (input.website) {
    res.status(201).json({ id: 'ok', type: input.type });
    return;
  }

  res.status(201).json(await createLead(input));
});
