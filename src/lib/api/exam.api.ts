/**
 * ============================================================================
 * 📝 EXAM API CLIENT
 * ============================================================================
 */

import { api } from './axios';
import type {
  ApiResponse,
  Exam,
  ExamDetail,
  PaginatedResponse,
  StartExamResponse,
  SubmitAnswerRequest,
  ParticipantQuestion,
  ExamResult,
} from '@/types/api.types';

export const examApi = {
  /**
   * Get available exams (participant view)
   */
  getExams: async (params?: { page?: number; limit?: number; search?: string }) => {
    const { data } = await api.get<ApiResponse<PaginatedResponse<Exam>>>('/exams', { params });
    return data.data!;
  },

  /**
   * Get exam details
   */
  getExamById: async (id: number) => {
    const { data } = await api.get<ApiResponse<{ exam: ExamDetail }>>(`/exams/${id}`);
    return data.data!.exam;
  },

  /**
   * Start exam session
   */
  startExam: async (examId: number) => {
    const { data } = await api.post<ApiResponse<StartExamResponse>>(`/exams/${examId}/start`);
    return data.data!;
  },

  /**
   * Get exam questions for active session
   */
  getExamQuestions: async (userExamId: number, type?: string) => {
    const { data } = await api.get<
      ApiResponse<{ questions: ParticipantQuestion[]; total: number }>
    >(`/user-exams/${userExamId}/questions`, { params: { type } });
    return data.data!;
  },

  /**
   * Submit answer (autosave)
   */
  submitAnswer: async (userExamId: number, answerData: SubmitAnswerRequest) => {
    const { data } = await api.post<ApiResponse<unknown>>(
      `/user-exams/${userExamId}/answers`,
      answerData
    );
    return data.data!;
  },

  /**
   * Submit exam (finish)
   */
  submitExam: async (userExamId: number) => {
    const { data } = await api.post<ApiResponse<{ result: ExamResult }>>(
      `/user-exams/${userExamId}/submit`
    );
    return data.data!;
  },

  /**
   * Get my results
   */
  getMyResults: async (params?: { page?: number; limit?: number; status?: string }) => {
    const { data } = await api.get<ApiResponse<PaginatedResponse<ExamResult>>>('/results/me', {
      params,
    });
    return data.data!;
  },

  /**
   * Get exam answers for review (after submit)
   */
  getExamAnswers: async (userExamId: number) => {
    const { data } = await api.get<ApiResponse<{ answers: unknown[]; total: number }>>(
      `/user-exams/${userExamId}/answers`
    );
    return data.data!;
  },
};
