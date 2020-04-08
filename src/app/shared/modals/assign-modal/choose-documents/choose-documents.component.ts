import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DocumentPass } from 'src/app/new-document/models/document-pass.interface';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-choose-documents',
  templateUrl: './choose-documents.component.html',
  styleUrls: ['./choose-documents.component.scss']
})
export class ChooseDocumentsComponent implements OnInit, OnChanges {

  @Input() documentsList;
  @Output() assignedDocumentList = new EventEmitter();
  @Output() loadNextPage = new EventEmitter();
  @Output() previousStep = new EventEmitter();
  @Output() onDocumentsSearch = new EventEmitter();

  documentsName = '';
  currentDocumentsList: DocumentPass[] = [];
  updatedDocumentsList: DocumentPass[] = [];
  public documentSearch$ = new Subject();

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.onSearchDocuments();
  }

  ngOnInit() {

    this.onDocumentsSearch.emit('');
    this.getIcons();
  }

  ngOnChanges(): void {
    if (this.documentsList) {
      this.currentDocumentsList = this.documentsList;
    }
  }

  public getIcons(): void {
    this.iconRegistry.addSvgIcon('doc', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/doc.svg'));
  }

  public toggleDocument(document): void {

    if (!this.updatedDocumentsList.some(doc => doc.id === document.id)) {
      this.updatedDocumentsList.push(document);
    } else {
      this.updatedDocumentsList.splice(this.findDocumentInList(document), 1);
    }
    this.updatePosition();
  }

  updatePosition() {
    this.updatedDocumentsList.forEach( (doc, index) => doc.orderInAssignment = index + 1);
  }

  public findDocumentInList(document): number{
    return this.updatedDocumentsList.findIndex(item => item.id === document.id);
  }

  public nextStep(): void {
    this.assignedDocumentList.emit({ documentsList: this.updatedDocumentsList, step: 3});
  }

  public isDisabled() {
    return !this.updatedDocumentsList || !this.updatedDocumentsList.length;
  }

  onSearchDocuments() {
    this.documentSearch$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((name: string) => {
        this.documentsName = name;
        this.onDocumentsSearch.emit(name);
      });
  }
}
