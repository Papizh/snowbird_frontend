import { QuestionAnswer } from './document-answer.interface';
import { QuestionType } from './question-type.interface';

export interface DocumentQuestion {
    delete?: boolean;
    documentId?: number;
    id?: number;
    placeOrder?: number;
    questionText?: string;
    type?: QuestionType;
    answers?: QuestionAnswer[];
    required?: boolean;
    answered?: boolean;
}
