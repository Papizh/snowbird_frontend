import { UserAnswer } from './user-answer.interface';

export interface DocumentPass {
    documentId: number;
    documentName?: string;
    assignmentId?: number;
    fullness?: number;
    id?: number;
    orderInAssignment?: number;
    published?: true;
    userAnswers?: UserAnswer[];
    questionAnswers: UserAnswer[][];
    uuid?: number;
}
