import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialogRef, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-assigning',
  templateUrl: './confirm-assigning.component.html',
  styleUrls: ['./confirm-assigning.component.scss']
})
export class ConfirmAssigningComponent implements OnInit, OnChanges {

  @Input() usersList: any[];
  @Input() documentsList: any[];
  @Input() assignmentName: string;
  @Input() onlyAssign: boolean;

  @Output() onConfirmAssigning = new EventEmitter();
  @Output() previousStep = new EventEmitter();

  updatedUsersList: any [] = [];
  updatedDocumentsList: any[] = [];

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              public dialogRef: MatDialogRef<ConfirmAssigningComponent>) { }

  ngOnInit() {
    this.getIcons();
  }

  ngOnChanges(): void {
    if (this.usersList && this.documentsList) {
      this.updatedDocumentsList = this.documentsList;
      this.updatedUsersList = this.usersList;
    }
  }

  public getIcons(): void {
    this.iconRegistry.addSvgIcon('doc', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/doc.svg'));
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.updatedDocumentsList, event.previousIndex, event.currentIndex);
    this.updatedDocumentsList.forEach( (document, index) => document.orderInAssignment = index + 1);
  }

  private onDeleteItem(item): void {
    if (!item.title) {
      this.updatedUsersList.splice(this.findUserInList(item), 1);
    } else {
      this.updatedDocumentsList.splice(this.findUserInList(item), 1);
    }
  }

  private findUserInList(obj): number {
    if (obj.firstName) {
      return this.updatedUsersList.findIndex(item => item.id === obj.id);
    }
    return this.updatedDocumentsList.findIndex(item => item.orderInAssignment === obj.orderInAssignment);
  }

  public confirmAssigning(): void {
    this.onConfirmAssigning.emit({
      users: this.updatedUsersList,
      name: this.assignmentName,
      documents: this.updatedDocumentsList
    });
  }

  public isDisabled() {
    return !this.updatedUsersList.length ||
           !this.updatedDocumentsList.length;
  }
}
