import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {OrganizationsService} from '../../services/organizations.service';
import {CreateUserModalComponent} from '../../shared/modals/create-user-modal/create-user-modal.component';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {SpinnerService} from '../../shared/services/spinner.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {DeleteDocModalComponent} from '../../shared/modals/delete-doc-modal/delete-doc-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public pageSize = 10;
  public pageIndex: number;
  public pageSizeOptions: number[] = [10, 25, 50];
  public usersList: any[] = [];
  public isOneOrganization: boolean;
  public usersCounter: number;

  public organizationsPage = 0;
  public organizationsLength: number;
  private organizationScrollStop = false;

  userTerm$ = new Subject<string>();
  private userRole: string;
  LIMIT = 5;
  ADMINISTRATORS_ORGANIZATION_ID = -66;
  limit = this.LIMIT;
  userSearchName = '';

  constructor(private userService: UsersService,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private organizationsService: OrganizationsService,
              private spinner: SpinnerService,
              private iconRegistry: MatIconRegistry) {
    this.userTerm$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((name) => {
        this.usersList = !name && this.userRole === 'ROLE_ADMINISTRATOR' ? [] : [{organization: null, users: []}];
        this.getSearchUserList(name);
      });
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('User-Role');
    if (this.userRole !== 'ROLE_ADMINISTRATOR') {
      this.usersList = [{organization: 'organization name', users: []}];
    }
    this.getUserList();
    this.setIcons();
  }

  public setIcons(): void {
    this.iconRegistry.addSvgIcon('arr-down', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-down.svg'));
    this.iconRegistry.addSvgIcon('arr-left', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/left-arrow.svg'));
  }

  public getUserList(page = this.organizationsPage, size = 10): void {
    this.isOneOrganization = false;
    this.spinner.show();

    const usersSubs = this.userSearchName ?
      this.userService.searchUser(this.userSearchName, page, size) :
      this.userService.getUsers(page, size);

    usersSubs.subscribe(data => {
      this.spinner.hide();
      this.organizationScrollStop = data['pages'] < this.pageSize;

      if (this.userRole === 'ROLE_ADMINISTRATOR' && !this.userSearchName) {
        this.usersList.push(... data['message']['result']);
        this.organizationsLength = data['pages'];
      } else {
        this.usersList[0].users.push(... data['message']);
        this.usersCounter = data['pages'];
      }
    });
  }

  public openCreateUserDialog(e): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      width: '600px'
    });
  }

  public getCurrentOrganization(e): void {
    this.spinner.show();
    this.isOneOrganization = true;

    const request = e.org.id == this.ADMINISTRATORS_ORGANIZATION_ID ?
      this.organizationsService.getAdministratorOrganization(e.page, e.size) :
      this.organizationsService.getOrganizationById(e.org.id, e.page, e.size);

    request.subscribe(data => {
      this.spinner.hide();
      this.usersCounter = data['pages'];
      this.usersList = [{organization: e, users: data['message']}];
    }, error => {
      this.isOneOrganization = false;
      this.spinner.hide();
    });
  }

  public getMoreOrganizations(): void {
    if (this.organizationScrollStop) {
      return;
    }
    this.organizationsPage++;
    this.getUserList(this.organizationsPage);
  }

  public isAllOrganizations(): boolean {
    if (this.usersList && !this.isOneOrganization) {
      return this.organizationsLength === this.usersList.length;
    }
  }

  public goBack() {
    this.organizationsPage = 0;
    this.usersList = this.userSearchName ? [{organization: null, users: []}] : [];
    this.getUserList();
  }

  public getSearchUserList(name): void {
    this.userSearchName = name;
    this.organizationsPage = 0;
    this.getUserList();
  }

  public nullUserList(pageIndex: number, pageSize: number): void {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.organizationsPage = 0;
    this.usersList = [{organization: null, users: []}];
    this.getUserList(this.organizationsPage, pageSize);
  }
}
