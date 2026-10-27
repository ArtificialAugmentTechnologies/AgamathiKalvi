import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n';
import { Link } from 'react-router-dom';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { interestForCluster } from '@/features/careers/careers';
import { useCareers } from '@/features/content/api';
import { SaveResultButton } from '@/features/auth/SaveResultButton';
import { useQuizQuestions, useSubmitQuiz } from '@/features/tools/api';
import type { ClusterScore } from '@/features/tools/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { localized } from '@/lib/format';
import { cn } from '@/lib/utils';

/** Career cluster id → its i18n key (i18n keys avoid the hyphen in "law-public"). */
const clusterKey = (c: string) =>
  (c === 'law-public' ? 'lawPublic' : c) as
    | 'technology'
    | 'healthcare'
    | 'finance'
    | 'lawPublic'
    | 'creative'
    | 'agriculture'
    | 'hospitality';

export default function QuizPage() {
  const { t } = useTranslation();
  const lang = useLanguage();
  usePageMeta(t('pages.quiz'));
  const { data: questions = [], isPending } = useQuizQuestions();
  const submit = useSubmitQuiz();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const result = submit.data?.top;

  const choose = (option: number) => {
    const next = [...answers.slice(0, step), option];
    setAnswers(next);
    if (step + 1 < questions.length) setStep(step + 1);
    else submit.mutate(next);
  };

  const restart = () => {
    submit.reset();
    setAnswers([]);
    setStep(0);
    setStarted(true);
  };

  const q = questions[step];
  const progress = questions.length
    ? ((result ? questions.length : step) / questions.length) * 100
    : 0;

  return (
    <>
      <PageHeader
        art="quiz"
        eyebrow={t('nav.toolsHeading')}
        title={t('pages.quiz')}
        description={t('quiz.lead')}
      />

      <section className="container-page pb-16">
        <div className="mx-auto max-w-3xl">
          {!started && (
            <div className="rounded-3xl border bg-card p-8 text-center sm:p-12">
              <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[#f2b48f] text-primary-foreground">
                <Sparkles className="size-8" aria-hidden />
              </span>
              <p className="mt-5 text-muted-foreground">{t('quiz.duration')}</p>
              <Button
                size="lg"
                className="mt-6"
                onClick={() => setStarted(true)}
                disabled={isPending || !questions.length}
              >
                {t('quiz.start')} <ArrowRight />
              </Button>
            </div>
          )}

          {started && !result && q && (
            <div className="rounded-3xl border bg-card p-6 sm:p-10">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span aria-live="polite">
                  {t('quiz.progress', { current: step + 1, total: questions.length })}
                </span>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1 font-medium hover:text-foreground"
                  >
                    <ArrowLeft className="size-4" aria-hidden /> {t('quiz.back')}
                  </button>
                )}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-sky transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mt-8 text-2xl font-semibold sm:text-3xl">
                    {localized(lang, q.text, q.textTa, q.textHi)}
                  </h2>
                  <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {q.options.map((o, i) => (
                      <li key={o.label}>
                        <button
                          type="button"
                          onClick={() => choose(i)}
                          disabled={submit.isPending}
                          aria-pressed={answers[step] === i}
                          className={cn(
                            'flex h-full min-h-16 w-full items-center gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/60 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                            answers[step] === i
                              ? 'border-primary bg-primary/10'
                              : 'bg-background/40',
                          )}
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted font-semibold">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{localized(lang, o.label, o.labelTa, o.labelHi)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
              {submit.isError && (
                <p className="mt-4 text-destructive">{t('forms.errors.generic')}</p>
              )}
            </div>
          )}

          {result && <Results top={result} onRetake={restart} />}
        </div>
      </section>

      <CallToAction
        preset={result?.[0] ? { interest: interestForCluster(result[0].cluster) } : undefined}
      />
    </>
  );
}

function Results({ top, onRetake }: { top: ClusterScore[]; onRetake: () => void }) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  // Celebrate — confetti is loaded only now, and skipped for reduced motion.
  useEffect(() => {
    if (reducedMotion) return;
    void import('canvas-confetti').then(({ default: confetti }) =>
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#e08a68', '#6ea8ff', '#ffd800', '#f3eee3'],
      }),
    );
  }, [reducedMotion]);

  return (
    <div>
      <h2 className="text-3xl font-semibold">{t('quiz.resultsTitle')}</h2>
      <ol className="mt-6 space-y-4">
        {top.map((c, i) => (
          <ClusterCard key={c.cluster} score={c} rank={i + 1} />
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted-foreground">{t('quiz.note')}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <SaveResultButton
          tool="quiz"
          variant="default"
          title={top
            .map((c) => `${t(`quiz.clusters.${clusterKey(c.cluster)}.name`)} ${c.percent}%`)
            .join(' · ')}
          input={{}}
          output={{ top }}
        />
        <Button variant="outline" size="lg" onClick={onRetake}>
          <RotateCcw /> {t('quiz.retake')}
        </Button>
      </div>
    </div>
  );
}

function ClusterCard({ score, rank }: { score: ClusterScore; rank: number }) {
  const { t } = useTranslation();
  const lang = useLanguage();
  const key = clusterKey(score.cluster);
  const { data: careers = [] } = useCareers({ cluster: score.cluster });

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 * rank }}
      className={cn(
        'rounded-3xl border bg-card p-6',
        rank === 1 && 'border-primary/50 shadow-xl shadow-primary/10',
      )}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-clay-soft font-serif text-xl font-semibold text-primary">
          {rank}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold">{t(`quiz.clusters.${key}.name`)}</h3>
            <span className="font-semibold text-primary">
              {t('quiz.match', { percent: score.percent })}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t(`quiz.clusters.${key}.desc`)}</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-[#f2b48f]"
              initial={{ width: 0 }}
              animate={{ width: `${score.percent}%` }}
              transition={{ duration: 0.8, delay: 0.2 + 0.15 * rank }}
            />
          </div>
          <p className="mt-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {t('quiz.careersIn')}
          </p>
          {careers.length ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {careers.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/careers/${c.slug}`}
                    className="inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition hover:border-primary hover:text-primary"
                  >
                    {localized(lang, c.title, c.titleTa, c.titleHi)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">{t('quiz.noCareers')}</p>
          )}
        </div>
      </div>
    </motion.li>
  );
}
