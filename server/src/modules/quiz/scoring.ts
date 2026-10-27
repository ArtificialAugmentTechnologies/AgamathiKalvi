// Pure scoring for the career interest quiz.

export type QuizOption = {
  label: string;
  labelTa?: string;
  labelHi?: string;
  weights: Record<string, number>;
};
export type QuizQuestionData = { id: string; options: QuizOption[] };

export type ClusterScore = { cluster: string; score: number; percent: number };

/**
 * Adds up each chosen option's weights per career cluster, then expresses each cluster as a
 * percentage of the most it could have scored on these questions.
 */
export function scoreQuiz(questions: QuizQuestionData[], answers: number[]): ClusterScore[] {
  const score: Record<string, number> = {};
  const max: Record<string, number> = {};

  questions.forEach((q, i) => {
    // The best weight any option of this question gives each cluster.
    const best: Record<string, number> = {};
    for (const opt of q.options) {
      for (const [cluster, w] of Object.entries(opt.weights)) {
        best[cluster] = Math.max(best[cluster] ?? 0, w);
      }
    }
    for (const [cluster, w] of Object.entries(best)) max[cluster] = (max[cluster] ?? 0) + w;

    const chosen = q.options[answers[i] ?? -1];
    if (!chosen) return;
    for (const [cluster, w] of Object.entries(chosen.weights)) {
      score[cluster] = (score[cluster] ?? 0) + w;
    }
  });

  return Object.keys(max)
    .map((cluster) => ({
      cluster,
      score: score[cluster] ?? 0,
      percent: Math.round(((score[cluster] ?? 0) / max[cluster]!) * 100),
    }))
    .sort((a, b) => b.percent - a.percent || b.score - a.score);
}
