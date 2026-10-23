import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { toolLimiter } from '../../middleware/rate-limit.js';
import { scoreQuiz, type QuizOption } from './scoring.js';

export const quizRouter = Router();

const loadQuestions = () => prisma.quizQuestion.findMany({ orderBy: { order: 'asc' } });

quizRouter.get('/questions', async (_req, res) => {
  const questions = await loadQuestions();
  // Clients only need the labels — the weights stay on the server.
  res.json(
    questions.map((q) => ({
      id: q.id,
      text: q.text,
      textTa: q.textTa,
      options: (q.options as QuizOption[]).map(({ label, labelTa }) => ({ label, labelTa })),
    })),
  );
});

const submission = z.object({ answers: z.array(z.number().int().min(0).max(9)).min(1).max(50) });

quizRouter.post('/results', toolLimiter, async (req, res) => {
  const { answers } = submission.parse(req.body);
  const questions = await loadQuestions();
  const ranked = scoreQuiz(
    questions.map((q) => ({ id: q.id, options: q.options as QuizOption[] })),
    answers,
  );
  const top = ranked.slice(0, 3);
  await prisma.quizResult.create({ data: { answers, topClusters: top } });
  res.status(201).json({ top, all: ranked });
});
