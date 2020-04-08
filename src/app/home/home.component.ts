import {Component, OnInit} from '@angular/core';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {UsersService} from '../services/users.service';
import {AssignModalComponent} from '../shared/modals/assign-modal/assign-modal.component';
import {DocumentsService} from '../services/documents.service';
import {DeleteDocModalComponent} from '../shared/modals/delete-doc-modal/delete-doc-modal.component';
import {CreateOrganizationModalComponent} from '../shared/modals/create-organization-modal/create-organization-modal.component';
import {CreateUserModalComponent} from '../shared/modals/create-user-modal/create-user-modal.component';
import {AssignedComponent} from '../shared/modals/assigned/assigned.component';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {SpinnerService} from '../shared/services/spinner.service';
import {OrganizationsService} from '../services/organizations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usersList;
  documentsList;
  regularDocs;
  organization: any;

  assignmentDocuments;
  assignmentUsers;
  userRole: string;

  constructor(private iconRegistry: MatIconRegistry,
              private organizationService: OrganizationsService,
              private sanitizer: DomSanitizer,
              private userService: UsersService,
              private documentsService: DocumentsService,
              public dialog: MatDialog,
              public router: Router,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('User-Role');
    this.setIcons();
    this.getRegularDocsDocuments();
    this.getUsers();
    if (this.userRole === 'ROLE_ADMINISTRATOR') {
      this.getOrganizations();
    }
  }

  public getOrganizations(): void {
    this.organizationService.getOrganizations(0, 1).subscribe((data) => {
      this.organization = data['message'] && data['message'][0] ? data['message'][0] : undefined;
    });
  }

  public getUsers(): void {
    this.spinner.show();
    this.userService.getHomeUsers()
      .subscribe((data) => {
        this.spinner.hide();
        this.usersList = data['message'];
      });
  }

  public setIcons(): void {
    this.iconRegistry.addSvgIcon('plus', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/plus.svg'));
  }

  public assignDocument(): void {
    const dialogRef = this.dialog.open(AssignModalComponent, {
      width: '90%',
      data: {
        users: this.assignmentUsers,
        documents: this.assignmentDocuments,
        step: 0
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(AssignedComponent, {
          width: '600px'
        });
      }
    });
  }

  private getDocuments(): void {
    this.documentsService.getDocuments()
      .subscribe(documents => this.documentsList = documents);
  }

  public openCreateOrganizationDialog(e): void {
    const dialogRef = this.dialog.open(CreateOrganizationModalComponent, {
      width: '600px'
    });
  }

  public openCreateUserDialog(e): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      width: '600px'
    });
  }

  public redirectToCreateDocument() {
    this.router.navigate(['/new-document']);
  }

  public getRegularDocsDocuments() {
    const LIMIT_DOCS = 4;
    this.spinner.show();
    this.documentsService.getDocuments(0, LIMIT_DOCS).subscribe(data => {
      this.spinner.hide();
      this.regularDocs = data['message'];
    }, () => {
      this.spinner.hide();
    });
  }

  public editDocument(e): void {
    this.router.navigate([`/new-document/${e.id}/edit`]);
  }
}

