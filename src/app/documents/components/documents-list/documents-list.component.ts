import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DocumentType} from '../../../new-document/models/document-type.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit, OnChanges {

  @Input() docList: any[];
  @Input() noneIcon: boolean;
  @Output() editDoc = new EventEmitter();
  @Output() assignDoc = new EventEmitter();
  @Output() deleteDoc = new EventEmitter();
  DocumentType = DocumentType;

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'options'];

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getIcons();
  }

  ngOnChanges(): void {
  }

  public getIcons(): void {
    this.iconRegistry.addSvgIcon('doc', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/doc.svg'));
  }

  public editDocument(e): void {
    if (e.documentName) {
      this.router.navigate(['/main/documents', e.documentId, 'results'], {queryParams: {id: e.id}});
    } else {
      this.editDoc.emit(e);
    }
  }

  public assignDocument(e): void {
    this.assignDoc.emit(e);
  }

  public deleteDocument(doc): void {
    this.deleteDoc.emit({doc});
  }
}
