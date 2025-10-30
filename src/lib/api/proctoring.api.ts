/**
 * ============================================================================
 * 📹 PROCTORING API CLIENT
 * ============================================================================
 */

import { api } from './axios';
import type {
  ApiResponse,
  ProctoringEvent,
  DetectFaceRequest,
  FaceDetectionResult,
  PaginatedResponse,
} from '@/types/api.types';

export const proctoringApi = {
  /**
   * Log single proctoring event
   */
  logEvent: async (eventData: {
    userExamId: number;
    eventType: string;
    metadata?: Record<string, unknown>;
    severity?: string;
  }) => {
    const { data } = await api.post<ApiResponse<{ event: ProctoringEvent }>>(
      '/proctoring/events',
      eventData
    );
    return data.data!;
  },

  /**
   * Detect face from image (ML integration)
   */
  detectFace: async (detectData: DetectFaceRequest) => {
    const { data } = await api.post<ApiResponse<FaceDetectionResult>>(
      '/proctoring/detect-face',
      detectData
    );
    return data.data!;
  },

  /**
   * Get proctoring events for user exam
   */
  getEvents: async (
    userExamId: number,
    params?: { page?: number; limit?: number; eventType?: string; severity?: string }
  ) => {
    const { data } = await api.get<ApiResponse<PaginatedResponse<ProctoringEvent>>>(
      `/proctoring/user-exams/${userExamId}/events`,
      { params }
    );
    return data.data!;
  },

  /**
   * Get proctoring statistics
   */
  getStats: async (userExamId: number) => {
    const { data } = await api.get<ApiResponse<unknown>>(
      `/proctoring/user-exams/${userExamId}/stats`
    );
    return data.data!;
  },
};
