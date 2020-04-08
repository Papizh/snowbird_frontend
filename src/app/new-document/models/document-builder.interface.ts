import { DocumentQuestion } from './document-question.interface';
import { DocumentInfo } from './document-info.interface';

export interface DocumentBuilder{
    title?: string;
    id?: number;
    organizationId?: number;
    global?: boolean;
    questions?: DocumentQuestion[];
    documentInfo?: DocumentInfo
}