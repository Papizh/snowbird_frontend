import {Component, OnInit, Input, Output, OnChanges, EventEmitter, AfterViewInit} from '@angular/core';
import {QuestionAnswer} from '../../models/document-answer.interface';
import {UserAnswer} from '../../models/user-answer.interface';
import {environment} from 'src/environments/environment';
import {ActivatedRoute} from '@angular/router';
import {DocumentsService} from 'src/app/services/documents.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() answers: UserAnswer[];
  @Input() questions: QuestionAnswer[];
  @Input() previewMode = false;
  @Output() onValid = new EventEmitter();

  apiUrl = environment.apiUrl;
  documentId: number;
  documentAnswerId: number;

  CURRENT_AVAILABLE_FILE_EXTENSHIONS = 'doc;docx;pdf;jpg;jpeg;png;csv;pages;txt;ppt;pptx;xls';
  afuConfig = {
    uploadAPI: {
      url: '',
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    },
    hideSelectBtn: false,
    multiple: true,
    formatsAllowed: '.jpg,.png,.pdf,.docx,.txt,.jpeg',
    maxSize: 20
  };
  passingMode: boolean;

  url = `${this.apiUrl}api/v1/su/document/answer/file/upload`;

  constructor(private route: ActivatedRoute,
              private documentService: DocumentsService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.trackValid();
  }

  ngOnChanges(changes) {
    const fieldValidation = this.questions[0].fieldValidation;
    this.documentId = +this.route.snapshot.params.id;
    this.documentAnswerId = +this.route.snapshot.queryParams.id;

    if (changes.questions && changes.questions.currentValue) {
      fieldValidation.fileExtensions = fieldValidation.fileExtensions && fieldValidation.fileExtensions.length ?
        fieldValidation.fileExtensions : this.CURRENT_AVAILABLE_FILE_EXTENSHIONS;

      this.afuConfig.uploadAPI.url = this.url + `?answerId=${this.answers[0].answerId}&documentId=${this.documentId}`;
      this.afuConfig.formatsAllowed = '.' + this.questions[0].fieldValidation.fileExtensions.replace(/[;]/g, ',.');
    }

    if (changes && changes.answers) {
      this.passingMode = !this.answers[0].text;
    }
  }

  ngAfterViewInit() {
    this.subscribeOnResetFiles();

  }

  subscribeOnResetFiles() {
    const resetBtn = document.getElementsByClassName('resetBtn') ? document.getElementsByClassName('resetBtn')[0] : null;
    if (!resetBtn) { return; }
    resetBtn['onclick'] = () => {
      this.answers[0].text = '';
      this.trackValid();
    };
  }

  updateFileUploadSettings({amount, formats, maxSize}: { amount: number, formats: string, maxSize: number }) {
    const formatsAllowed = '.' + formats.replace(/[;]/g, ',.');
    this.afuConfig.multiple = amount > 1;
    this.afuConfig.formatsAllowed = formatsAllowed;
    this.afuConfig.maxSize = maxSize;
    this.afuConfig.uploadAPI.url += `?answerId=${this.answers[0].answerId}&documentId=${this.documentId}`;

    this.afuConfig = {
      ...this.afuConfig
    };
  }

  onDocUpload($event) {
    this.answers[0].text = '';
    if ($event.response) {
      const ids = JSON.parse($event.response).message;

      ids.forEach((id, index) => {
        const devider = index !== (ids.length - 1) ? ';' : '';
        this.answers[0].text += id + devider;
        this.trackValid();
      });
    } else {
      this.toastr.error('Upload failed!');
    }
  }

  getFiles(text: string, noSlice = false) {
    return text
      .split(';')
      .filter((item) => !!item)
      .map((item) => {
        return noSlice ? item : item.slice(37);
      });
  }

  startDownloading(index, item) {
    this.documentService.getDownloadLink(this.documentId, this.documentAnswerId, this.getFiles(this.answers[0].text, true)[index])
      .subscribe((resultByte) => {
        const blob = new Blob([resultByte], {type: 'application/octet-stream'});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = item;
        link.click();
      });
  }

  trackValid() {
    let valid = false;
    valid = !!this.answers[0].text;
    this.onValid.emit({valid});
  }
}
