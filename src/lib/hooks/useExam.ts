/**
 * ============================================================================
 * 📝 EXAM HOOKS (REACT QUERY)
 * ============================================================================
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { examApi } from '@/lib/api/exam.api';
import { useExamStore } from '@/lib/store/examStore';
import { toast } from 'sonner';

export function useExams(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: ['exams', params],
    queryFn: () => examApi.getExams(params),
  });
}

export function useExamDetail(id: number) {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => examApi.getExamById(id),
    enabled: !!id,
  });
}

export function useStartExam() {
  const setSession = useExamStore((state) => state.setSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (examId: number) => examApi.startExam(examId),
    onSuccess: (data) => {
      setSession(data.userExam);
      toast.success('Exam started successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to start exam');
    },
  });
}

export function useSubmitAnswer() {
  const updateAnswer = useExamStore((state) => state.updateAnswer);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userExamId, answerData }: { userExamId: number; answerData: any }) =>
      examApi.submitAnswer(userExamId, answerData),
    onSuccess: (data, variables) => {
      updateAnswer(variables.answerData.examQuestionId, {
        examQuestionId: variables.answerData.examQuestionId,
        selectedOption: variables.answerData.selectedOption,
        answeredAt: new Date().toISOString(),
      });
      // Don't show toast for each answer (too noisy)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save answer');
    },
  });
}

export function useSubmitExam() {
  const clearSession = useExamStore((state) => state.clearSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userExamId: number) => examApi.submitExam(userExamId),
    onSuccess: () => {
      clearSession();
      queryClient.invalidateQueries({ queryKey: ['results'] });
      toast.success('Exam submitted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit exam');
    },
  });
}

export function useMyResults(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ['results', 'me', params],
    queryFn: () => examApi.getMyResults(params),
  });
}
