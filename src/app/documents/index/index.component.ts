import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DocumentsService} from '../../services/documents.service';
import {DeleteDocModalComponent} from '../../shared/modals/delete-doc-modal/delete-doc-modal.component';
import {Router} from '@angular/router';
import {SpinnerService} from '../../shared/services/spinner.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {DocumentType} from '../../new-document/models/document-type.interface';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-documents',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public documents = [];
  public actionName = 'Create document';
  public pageSize = 25;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [10, 25, 50];
  public documentsLength: number;
  public searchDocument: string;
  public tabChanging = true;

  DocumentType = DocumentType;
  documentTerm$ = new Subject<string>();
  public currentTabType: DocumentType = DocumentType.REGULAR_DOCUMENT;

  constructor(private documentsService: DocumentsService,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private router: Router,
              private spinner: SpinnerService) {
    this.documentTerm$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((name) => {
        this.searchDocument = name;
        this.getDocumentList('' , this.pageIndex, this.pageSize);
      });
  }

  ngOnInit() {
    this.getDocumentList();
  }

  public getDocumentList(name = this.searchDocument, page = this.pageIndex, size = this.pageSize, type = this.currentTabType) {
    this.spinner.show();
    this.pageIndex = page;
    this.pageSize = size;

    const observable = this.searchDocument ?
      this.documentsService.searchDocument(this.currentTabType, this.searchDocument, page, size) :
      this.documentsService.getDocuments(page, size, type);

    observable
      .subscribe((data) => {
        this.spinner.hide();
        this.documents = data['message'];
        this.documentsLength = page === 0 ? data['pages'] : this.documentsLength;
      }, () => {
        this.spinner.hide();
      });
  }

  public onTabChange(tabIndex): void {
    this.tabChanging = false;
    setTimeout( () => this.tabChanging = true, 100);
    this.pageSize = 10;
    this.pageIndex = 0;
    const types = ['REGULAR_DOCUMENT', 'COMPLAINT', 'COMPLAINT_RESULTS', 'ALL'];
    this.currentTabType = DocumentType[types[tabIndex]] as DocumentType;
    this.searchDocument = '';
    this.getDocumentList('', this.pageIndex, this.pageSize, DocumentType[types[tabIndex]] as DocumentType);
  }

  public editDocument(e): void {
    this.router.navigate([`/new-document/${e.id}/edit`]);
  }

  public assignDocument(e): void {
  }

  public deleteDocument(e): void {
    const dialogRef = this.dialog.open(DeleteDocModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.documentsService.deleteDocument(e.doc.id).subscribe(res => {
          this.toastr.success(res['message']);
          this.spinner.hide();
          this.ngOnInit();
        }, (error) => {
          this.toastr.error(error.error.message);
        });
      }
    });
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string): void {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  public redirectToNewDocument() {
    this.router.navigate(['/new-document']);
  }
}
