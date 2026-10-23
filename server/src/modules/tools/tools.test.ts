import { describe, expect, it } from 'vitest';
import { scoreQuiz, type QuizQuestionData } from '../quiz/scoring.js';
import { isEligible, type ScholarshipRules } from '../scholarships/scholarships.js';
import { classify, predict } from './predictor.js';

describe('college predictor', () => {
  it('classifies by margin against the latest closing cutoff', () => {
    expect(classify(3)).toBe('safe');
    expect(classify(1.5)).toBe('safe');
    expect(classify(0)).toBe('moderate');
    expect(classify(-1.5)).toBe('moderate');
    expect(classify(-3)).toBe('dream');
    expect(classify(-5)).toBe('dream');
    expect(classify(-5.5)).toBeNull();
  });

  it('uses the most recent year, groups and sorts strongest first', () => {
    const candidates = [
      {
        name: 'A',
        history: [
          { year: 2025, closingCutoff: 180 },
          { year: 2023, closingCutoff: 195 },
        ],
      },
      { name: 'B', history: [{ year: 2025, closingCutoff: 186 }] },
      { name: 'C', history: [{ year: 2025, closingCutoff: 190 }] },
      { name: 'D', history: [{ year: 2025, closingCutoff: 199 }] },
      { name: 'E', history: [] },
    ];
    const g = predict(186, candidates);
    expect(g.safe.map((c) => c.name)).toEqual(['A']); // 2025 closing 180, not 2023's 195
    expect(g.safe[0]!.history.map((h) => h.year)).toEqual([2023, 2025]);
    expect(g.moderate.map((c) => c.name)).toEqual(['B']);
    expect(g.dream.map((c) => c.name)).toEqual(['C']);
    expect([...g.safe, ...g.moderate, ...g.dream].some((c) => c.name === 'D')).toBe(false);
  });
});

describe('scholarship eligibility', () => {
  const base: ScholarshipRules = {
    classLevels: [],
    communities: [],
    incomeMax: null,
    gender: 'any',
    streams: [],
  };

  it('treats empty lists and null limits as open to all', () => {
    expect(
      isEligible(base, {
        classLevel: 'class12',
        community: 'OC',
        income: 900000,
        gender: 'male',
        stream: 'arts',
      }),
    ).toBe(true);
  });

  it('applies each criterion', () => {
    const s = {
      ...base,
      classLevels: ['class12'],
      communities: ['SC', 'ST'],
      incomeMax: 250000,
      gender: 'female' as const,
    };
    expect(
      isEligible(s, { classLevel: 'class12', community: 'SC', income: 200000, gender: 'female' }),
    ).toBe(true);
    expect(isEligible(s, { classLevel: 'class10' })).toBe(false);
    expect(isEligible(s, { community: 'BC' })).toBe(false);
    expect(isEligible(s, { income: 300000 })).toBe(false);
    expect(isEligible(s, { gender: 'male' })).toBe(false);
  });
});

describe('quiz scoring', () => {
  const questions: QuizQuestionData[] = [
    {
      id: '1',
      options: [
        { label: 'a', weights: { tech: 2 } },
        { label: 'b', weights: { health: 2 } },
      ],
    },
    {
      id: '2',
      options: [
        { label: 'a', weights: { tech: 1, finance: 1 } },
        { label: 'b', weights: { health: 2 } },
      ],
    },
  ];

  it('ranks clusters by share of their maximum score', () => {
    const ranked = scoreQuiz(questions, [0, 0]);
    expect(ranked[0]).toEqual({ cluster: 'tech', score: 3, percent: 100 });
    expect(ranked.find((r) => r.cluster === 'health')!.percent).toBe(0);
    expect(ranked.find((r) => r.cluster === 'finance')!.percent).toBe(100);
  });

  it('ignores unanswered or out-of-range answers', () => {
    expect(scoreQuiz(questions, [5]).every((r) => r.score === 0)).toBe(true);
  });
});
