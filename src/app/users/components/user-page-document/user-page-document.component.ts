import {Component,  OnInit, Input} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { DocumentType } from 'src/app/new-document/models/document-type.interface';

@Component({
  selector: 'app-user-page-document',
  templateUrl: './user-page-document.component.html',
  styleUrls: ['./user-page-document.component.scss']
})
export class UserPageDocumentComponent implements OnInit {

  @Input() isUserAdmin = false;
  assignments: any[] = [];
  assignmentPage = 0;
  testValue = -10;
  id: number;
  scrollLock = false;
  role: string;
  roleUser: boolean;
  DocumentType = DocumentType;

  constructor(private iconRegistry: MatIconRegistry,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: SpinnerService,
              private userService: UsersService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.role = localStorage.getItem('User-Role');
    this.roleUser = this.role === 'ROLE_SIMPLE_USER';

    this.route.params
      .subscribe((params) => {
        this.id = params['id'] === 'profile' ? null : +params['id'];
        this.getUserAssignments(this.id);
      });
    this.getIcons();
  }

  public getUserAssignments(userId, page = 0, size = 10): void {
    if (this.isUserAdmin) {
      return;
    }
    this.spinner.show();
    this.userService.getUserAssignments(userId, page, size)
      .subscribe((data) => {
        this.assignments.push( ... data['message']);
        this.addLockProperty();
        this.spinner.hide();

        if (!data.message) {
          this.scrollLock = true;
        }
      });
  }

  addLockProperty() {
    this.assignments.forEach( (assignment) => {
      assignment.documentAnswers.forEach( (document, index) => {
        document['lock'] =
          this.ifRoleUserAnd(assignment, document, index)
          ||
          this.ifRoleAdminOrModeratorAnd(assignment, document, index);
      });
    });
  }

  ifRoleUserAnd(assignment, document, index): boolean {
    return (this.roleUser &&
      document.documentType === DocumentType.REGULAR_DOCUMENT &&
      index !== 0 &&
      assignment.documentAnswers.some( (doc, i) =>
      !doc.published && i < index && doc.documentType === DocumentType.REGULAR_DOCUMENT)
    );
  }


  ifRoleAdminOrModeratorAnd(assignment, document, index): boolean {
    return (!this.roleUser && document.documentType === DocumentType.COMPLAINT) ||
           (!this.roleUser && !document.published);
  }

  public getIcons(): void {
    this.iconRegistry.addSvgIcon('doc', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/doc.svg'));
  }

  goToDocumentView(document) {
    if (this.roleUser && !document.published ) {
      this.router.navigate(['/main/documents/', document.documentId, 'pass'],
      {
        queryParams: {
          'id' : document.id,
          'assignmentId' : document.assignmentId,
        }
      });
    } else {
      this.router.navigate(['/main/documents/', document.documentId, 'results'], { queryParams: { 'id' : document.id }});
    }
  }

  getUniqueIndex(assignmentId, documentId, index) {
    return `${assignmentId}-${documentId}-${index}`;
  }

  loadNextPage() {
    if (this.scrollLock) {
      return;
    }
    this.assignmentPage++;
    this.getUserAssignments(this.id, this.assignmentPage);
  }
}
