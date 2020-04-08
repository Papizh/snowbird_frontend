import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DeleteDocModalComponent} from '../../../shared/modals/delete-doc-modal/delete-doc-modal.component';
import {UsersService} from '../../../services/users.service';
import {ToastrService} from 'ngx-toastr';
import {SpinnerService} from '../../../shared/services/spinner.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-organizations-users-list',
  templateUrl: './organizations-users-list.component.html',
  styleUrls: ['./organizations-users-list.component.scss']
})
export class OrganizationsUsersListComponent implements OnInit, OnChanges {

  @Input() organizationList: any[];
  @Input() oneOrganization: boolean;
  @Input() usersCounter: number;
  @Output() onGetOrganization = new EventEmitter();
  @Output() onDeleteUserInList = new EventEmitter<any>();
  private organization;

  LIMIT = 5;
  limit = this.LIMIT;
  public pageSize = 10;
  public pageIndex: number;
  public pageSizeOptions: number[] = [10, 25, 50];
  private userRole: string;

  constructor(private iconRegistry: MatIconRegistry,
              private spinner: SpinnerService,
              private toastr: ToastrService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private userService: UsersService,
              public router: Router,
  ) {
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('User-Role');
    this.setIcons();
  }

  ngOnChanges(): void {
    if (this.organizationList) {
      this.organizationList.map(item => {
        item.limit = this.LIMIT;
        return item;
      });
    }
  }

  public setIcons(): void {
    this.iconRegistry.addSvgIcon('plus', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/plus.svg'));
  }

  public showMore(item, page, size): void {
    this.onGetOrganization.emit({org: item.organization, page, size});
  }

  public onGetCurrentOrganization(e, page, size): void {
    if (this.organizationList[0].organization) {
      this.organization = this.organizationList[0].organization.org;
    }
    this.pageSize = size;
    this.pageIndex = page;
    this.onGetOrganization.emit({org: this.organization, page, size});
  }
  public deleteUser(user) {
    const dialogRef = this.dialog.open(DeleteDocModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.userService.deteteUser(user.id).subscribe(resp => {
          this.toastr.success(resp['message']);
          this.spinner.hide();
          location.reload();
        }, (error) => {
          this.spinner.hide();
          this.toastr.error(error.error.message);
        });
      }
    });
  }
 public editUser(user): void {
     this.router.navigate(['/main/users/', user.id], {queryParams: {id: user.id}});
   }
}
