export type UserRole = 'ADMIN' | 'PARTICIPANT';

export type ExamStatus = 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED' | 'TIMEOUT';

export type QuestionType = 'TIU' | 'TKP' | 'TWK';

export type ProctoringEventType =
    | 'FACE_DETECTED'
    | 'NO_FACE_DETECTED'
    | 'MULTIPLE_FACES'
    | 'LOOKING_AWAY';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';