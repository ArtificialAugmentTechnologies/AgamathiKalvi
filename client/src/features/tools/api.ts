import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type {
  BranchRef,
  ClusterScore,
  CollegeOption,
  PredictResponse,
  QuizQuestion,
  Scholarship,
} from './types';

const LONG = 10 * 60_000;

const toQuery = (params: Record<string, string | number | string[] | undefined>) =>
  new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      v === undefined || v === '' || (Array.isArray(v) && !v.length)
        ? []
        : [[k, Array.isArray(v) ? v.join(',') : String(v)]],
    ),
  ).toString();

export const useBranches = () =>
  useQuery({
    queryKey: ['branches'],
    queryFn: () => api<BranchRef[]>('/tools/branches'),
    staleTime: LONG,
  });

export type PredictParams = {
  cutoff: number;
  community: string;
  branches: string[];
  districts: string[];
};

export const usePrediction = (params: PredictParams | null) =>
  useQuery({
    queryKey: ['predict', params],
    queryFn: () => api<PredictResponse>(`/tools/predict?${toQuery(params!)}`),
    enabled: params !== null,
    staleTime: LONG,
  });

export const useCollegeOptions = (q: string, branch: string) =>
  useQuery({
    queryKey: ['college-options', q, branch],
    queryFn: () => api<CollegeOption[]>(`/tools/college-options?${toQuery({ q, branch })}`),
    staleTime: LONG,
    placeholderData: (previous) => previous,
  });

export type ScholarshipCriteria = {
  classLevel?: string;
  community?: string;
  income?: number;
  gender?: string;
  stream?: string;
};

export const useScholarships = (criteria: ScholarshipCriteria) =>
  useQuery({
    queryKey: ['scholarships', criteria],
    queryFn: () =>
      api<{ total: number; isSample: boolean; items: Scholarship[] }>(
        `/scholarships?${toQuery(criteria)}`,
      ),
    staleTime: LONG,
    placeholderData: (previous) => previous,
  });

export const useQuizQuestions = () =>
  useQuery({
    queryKey: ['quiz-questions'],
    queryFn: () => api<QuizQuestion[]>('/quiz/questions'),
    staleTime: LONG,
  });

export const useSubmitQuiz = () =>
  useMutation({
    mutationFn: (answers: number[]) =>
      api<{ top: ClusterScore[]; all: ClusterScore[] }>('/quiz/results', {
        method: 'POST',
        body: JSON.stringify({ answers }),
      }),
  });
