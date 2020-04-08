import { FieldValidation } from './field-validation.interface';

export interface QuestionAnswer {
    answerText?: string;
    dateFormat?: string;
    delete?: boolean;
    endPoint?: number;
    id?: number;
    placeOrder?: number;
    questionId?: number;
    startPoint?: number;
    type?: string;
    valid?: boolean;
    fieldValidation?: FieldValidation;
}
