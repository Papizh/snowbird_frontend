import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {TEXT_FIELD} from '../../models/field-validation.interface';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-answer-validation',
  templateUrl: './answer-validation.component.html',
  styleUrls: ['./answer-validation.component.scss']
})
export class AnswerValidationComponent implements OnInit, OnChanges {

  @Input() fieldValidation;
  @Input() validate;
  @Output() changeValidation = new EventEmitter();
  @Output() onValid = new EventEmitter();

  TEXT_FIELD = TEXT_FIELD;
  CURRENT_AVAILABLE_FILE_EXTENSHIONS = 'doc;docx;pdf;jpg;jpeg;png;csv;pages;txt;ppt;pptx;xls';
  defaultModuleFormats = [];
  formats = new FormControl([...this.defaultModuleFormats]);
  minIncorrect;
  maxIncorrect;

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  fieldTypes = [
    {type: TEXT_FIELD.TEXT_FIELD, label: 'Text'},
    {type: TEXT_FIELD.DECIMAL_FIELD, label: 'Decimal'},
    {type: TEXT_FIELD.NUMBER_FIELD, label: 'Number'}
  ];

  ngOnInit() {
    this.defaultModuleFormats = this.CURRENT_AVAILABLE_FILE_EXTENSHIONS.split(';').filter(item => !!item);

    const editeMode = this.route.snapshot.params['id'];
    if (!editeMode) {
      setTimeout(() => this.selectionChange(this.defaultModuleFormats));
    }
    this.getIncorrectValues();
  }

  ngOnChanges(changes) {

    if (changes.validate && changes.validate.currentValue) {
      this.trackValid();
    }
    if (changes.fieldValidation && changes.fieldValidation.currentValue && this.fieldValidation.fileExtensions) {
      const fileFormatsValue = this.fieldValidation.fileExtensions.split(';').filter((item) => item);
      this.formats = new FormControl([...fileFormatsValue]);
      this.getIncorrectValues();
    }
  }

  trackValid() {
    let valid = false;
    const length = this.fieldValidation.fieldType === TEXT_FIELD.TEXT_FIELD ? this.validate.length : this.validate;

    valid = length >= this.fieldValidation.min
      && length <= this.fieldValidation.max
      && (this.getPattern(this.fieldValidation)).test(this.validate + '');

    // console.log('\n');
    // console.log('max - ', length <= this.fieldValidation.max);
    // console.log('min - ', length >= this.fieldValidation.min);
    // console.log('pattern - ', (this.getPattern(this.fieldValidation)).test(this.validate + ''));
    // console.log('\n');

    this.onValid.emit({valid});
    return valid;
  }


  getPattern(fieldValidation): RegExp {
    switch (fieldValidation.fieldType) {
      case TEXT_FIELD.TEXT_FIELD:
        return /(.+|\n)/;
      case TEXT_FIELD.NUMBER_FIELD:
        return /^((-?|[1-9])[0-9]*)$/;
      case TEXT_FIELD.DECIMAL_FIELD:
        return /^((-?[0-9]*)\.?([0-9]*))$/;
    }
  }

  getPlaceholder(part) {
    switch (this.fieldValidation.fieldType) {
      case TEXT_FIELD.TEXT_FIELD:
        return part + ' length';
      case TEXT_FIELD.NUMBER_FIELD:
        return part + ' number';
      case TEXT_FIELD.DECIMAL_FIELD:
        return part + ' number';
      case TEXT_FIELD.UPLOAD_FILE_FIELD:
        return part + ' files';
    }
  }

  selectionChange(values) {
    this.fieldValidation.fileExtensions = '';

    values.forEach((value, index) => {
      const devider = index !== values.length - 1 ? ';' : '';
      this.fieldValidation.fileExtensions += value + devider;
    });
    this.emitChanges();
  }

  emitChanges(value = '') {
    if (this.changeValidation) {
      this.changeValidation.emit({
        amount: this.fieldValidation.max,
        formats: this.fieldValidation.fileExtensions,
        maxSize: this.fieldValidation.maxSizeOfFile
      });
    }
    this.trackValid();
    this.getIncorrectValues();
    this.minMaxValueValidation(value);
  }

  isTextOrFileType(): boolean {
    return this.fieldValidation.fieldType === TEXT_FIELD.TEXT_FIELD ||
      this.fieldValidation.fieldType === TEXT_FIELD.UPLOAD_FILE_FIELD;
  }

  minMaxValueValidation(part) {
    if (this.fieldValidation.max < this.fieldValidation.min) {
      this.fieldValidation[part] = undefined;
      this.toastr.warning('Validation warning! Max value cannot be less than min');
    }
  }

  getIncorrectValues() {
    const isTextOrUploadFileField = this.fieldValidation.fieldType === TEXT_FIELD.UPLOAD_FILE_FIELD ||
                                    this.fieldValidation.fieldType === TEXT_FIELD.TEXT_FIELD;
    const isNumberOrDecimalField = this.fieldValidation.fieldType === TEXT_FIELD.DECIMAL_FIELD ||
                                    this.fieldValidation.fieldType === TEXT_FIELD.NUMBER_FIELD;

    if (isTextOrUploadFileField) {
      this.minIncorrect = ['negative'];
      this.maxIncorrect = ['negative', 'zero'];
    } else if (isNumberOrDecimalField) {
      this.minIncorrect = [];
      this.maxIncorrect = [];
    }
  }
}
