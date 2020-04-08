import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersService} from 'src/app/services/users.service';
import {DocumentsService} from 'src/app/services/documents.service';
import {SpinnerService} from '../../services/spinner.service';
import {ToastrService} from 'ngx-toastr';
import {DocumentType} from '../../../new-document/models/document-type.interface';

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.scss']
})
export class AssignModalComponent implements OnInit {

  assignmentDocuments: any[] = [];
  assignmentUsers: any[] = [];

  assignmentChoosenDocuments: any[] = [];
  assignmentChoosenUsers: any[] = [];

  step = 0;
  onlyAssign: boolean;
  assignmentName: string;
  usersPage = 0;
  documentsPage = 0;

  stopDocumentsScroll = false;
  stopUsersScroll = false;

  constructor(
    public dialogRef: MatDialogRef<AssignModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataList: any,
    private userService: UsersService,
    private spinner: SpinnerService,
    private toastr: ToastrService,
    private documentsService: DocumentsService) {}

  ngOnInit() {
    this.onlyAssign = this.dataList.onlyAssign;
    this.step = this.dataList.step;
    this.assignmentUsers = this.dataList.users || [];
  }

  public getUsersForAssignment(name = '', page = this.usersPage, size = 10): void {
    if (this.stopUsersScroll) {
      return;
    }

    this.spinner.show();
    const usersObservable  = name ?
      this.userService.searchUserinAssignment (name, page, size) :
      this.userService.getUsersForAssignment(page, size);
    this.stopUsersScroll = true;
    usersObservable
      .subscribe((data) => {
        this.stopUsersScroll = false;
        this.spinner.hide();
        if (!data['message'] || data['message'].length < size) {
          this.stopUsersScroll = true;
        }
        this.assignmentUsers.push( ...data['message'] );
      });
  }

  public getMoreUser(name) {
    if (this.stopUsersScroll) {
      return;
    }
    this.usersPage++;
    this.getUsersForAssignment(name);
  }

  public getUsersByName(name) {
    this.usersPage = 0;
    this.assignmentUsers = [];
    const size = 25;
    this.stopUsersScroll = false;
    this.getUsersForAssignment(name, this.usersPage, size);
  }

  public getAssignmentDocuments(name = '', page = this.documentsPage, size = 10): void {
    if (this.stopDocumentsScroll) {
      return;
    }
    this.spinner.show();
    this.stopDocumentsScroll = true;

    const documentsObservable  = name ?
      this.documentsService.searchDocument(DocumentType.ALL, name, page, size, true) :
      this.documentsService.getAssignmentDocuments(page, size);
    this.stopDocumentsScroll = true;
    documentsObservable
      .subscribe((data) => {
        this.stopDocumentsScroll = false;
        this.spinner.hide();
        if (!data['message'] || data['message'].length < size) {
          this.stopDocumentsScroll = true;
        }
        this.assignmentDocuments.push( ...data['message'] );
      });
  }

  public getMoreDocuments(name) {
    if (this.stopDocumentsScroll) {
      return;
    }
    this.documentsPage++;
    this.getAssignmentDocuments(name);
  }

  public getDocumentsByName(name) {
    this.documentsPage = 0;
    this.assignmentDocuments = [];
    const size = 25;
    this.stopDocumentsScroll = false;
    this.getAssignmentDocuments(name, this.documentsPage, size);
  }



  public onZeroStep(e): void {
    this.assignmentName = e.name;
    this.step = e.step;
  }

  public onFirstStep(e): void {
    this.assignmentChoosenUsers = e.userList;
    this.step = e.step;
  }

  public onSecondStep(e): void {
    this.assignmentChoosenDocuments = e.documentsList;
    if (this.onlyAssign) {
      this.assignmentChoosenUsers = this.assignmentUsers;
    }
    this.step = e.step;
  }

  public confirmingAssigning(e) {
    this.spinner.show();
    this.documentsService.assignDocuments(
      this.assignmentName,
      this.assignmentChoosenDocuments,
      this.assignmentChoosenUsers)
      .subscribe( (data) => {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.dialogRef.close();
      }, (error) => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error(error.error.message);
      });
  }

  public previousStep(e) {
    if (this.onlyAssign && e.step === 1) {
      this.step = 0;
      return;
    }
    this.step = e.step;
  }
}
