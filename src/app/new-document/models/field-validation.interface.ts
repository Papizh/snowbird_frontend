export interface FieldValidation {
    fieldType?: TEXT_FIELD;
    fileExtensions?: string;
    max?: number;
    maxSizeOfFile?: number;
    min?: number;
}

export enum TEXT_FIELD {
    TEXT_FIELD = 'TEXT_FIELD',
    NUMBER_FIELD = 'NUMBER_FIELD',
    DECIMAL_FIELD = 'DECIMAL_FIELD',
    UPLOAD_FILE_FIELD = 'UPLOAD_FILE_FIELD',
}
