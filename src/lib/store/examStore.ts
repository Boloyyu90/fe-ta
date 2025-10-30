/**
 * ============================================================================
 * 📝 EXAM STORE (ZUSTAND)
 * ============================================================================
 */

import { create } from 'zustand';
import type { UserExamSession, ParticipantAnswer } from '@/types/api.types';

interface ExamState {
  currentSession: UserExamSession | null;
  answers: Record<number, ParticipantAnswer>; // examQuestionId -> answer
  timeRemaining: number | null; // milliseconds
}

interface ExamActions {
  setSession: (session: UserExamSession) => void;
  updateAnswer: (examQuestionId: number, answer: ParticipantAnswer) => void;
  setTimeRemaining: (time: number) => void;
  clearSession: () => void;
}

type ExamStore = ExamState & ExamActions;

export const useExamStore = create<ExamStore>((set) => ({
  // State
  currentSession: null,
  answers: {},
  timeRemaining: null,

  // Actions
  setSession: (session) => {
    set({ currentSession: session, timeRemaining: session.remainingTimeMs });
  },

  updateAnswer: (examQuestionId, answer) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [examQuestionId]: answer,
      },
    }));
  },

  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },

  clearSession: () => {
    set({ currentSession: null, answers: {}, timeRemaining: null });
  },
}));
