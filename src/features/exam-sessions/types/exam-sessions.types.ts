// src/features/exam-sessions/types/exam-session.types.ts
import { ExamStatus, QuestionType } from '@/shared/types/common.types';

// ==================== EXAM SESSION ====================
export interface ExamSession {
    id: number;
    examId: number;
    examTitle: string;
    durationMinutes: number;
    startedAt: string;
    submittedAt: string | null;
    status: ExamStatus;
    remainingTimeMs: number | null;
    totalQuestions: number;
    answeredQuestions: number;
}

// ==================== QUESTIONS ====================
export interface ExamQuestion {
    id: number;
    examQuestionId: number;
    content: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
        E: string;
    };
    questionType: QuestionType;
    orderNumber: number;
}

export interface ParticipantAnswer {
    examQuestionId: number;
    selectedOption: string | null;
    answeredAt: string | null;
}

// ==================== API RESPONSES ====================
export interface StartExamResponse {
    userExam: ExamSession;
    questions: ExamQuestion[];
    answers: ParticipantAnswer[];
}

export interface SubmitAnswerRequest {
    examQuestionId: number;
    selectedOption: 'A' | 'B' | 'C' | 'D' | 'E' | null;
}

export interface SubmitAnswerResponse {
    answer: {
        examQuestionId: number;
        selectedOption: string | null;
        answeredAt: string;
    };
    progress: {
        answered: number;
        total: number;
        percentage: number;
    };
}

export interface AnswerReview {
    examQuestionId: number;
    questionContent: string;
    questionType: QuestionType;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
        E: string;
    };
    selectedOption: string | null;
    correctAnswer: string;
    isCorrect: boolean | null;
    score: number;
}

export interface ExamResult {
    id: number;
    exam: {
        id: number;
        title: string;
        description: string | null;
    };
    user: {
        id: number;
        name: string;
        email: string;
    };
    startedAt: string;
    submittedAt: string | null;
    totalScore: number | null;
    status: ExamStatus;
    duration: number | null;
    answeredQuestions: number;
    totalQuestions: number;
    scoresByType: Array<{
        type: QuestionType;
        score: number;
        maxScore: number;
        correctAnswers: number;
        totalQuestions: number;
    }>;
}