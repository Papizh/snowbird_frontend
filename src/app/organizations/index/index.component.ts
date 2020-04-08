import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '../../services/organizations.service';
import {CreateOrganizationModalComponent} from '../../shared/modals/create-organization-modal/create-organization-modal.component';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {SpinnerService} from '../../shared/services/spinner.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {DeleteDocModalComponent} from '../../shared/modals/delete-doc-modal/delete-doc-modal.component';


@Component({
  selector: 'app-organizations',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public organizationsList: any[];
  public actionName = 'Create organization';
  public organizationsLength: number;


  public pageSize = 10;
  public pageIndex: number;
  public pageSizeOptions: number[] = [10, 25, 50];
  private searchOrganization = '';

  organizationTerm$ = new Subject<string>();
  private userRole: string;

  constructor(private organizationsService: OrganizationsService,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private spinner: SpinnerService) {
    this.organizationTerm$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((text) => {
        this.searchOrganization = text;
        this.getOrganizationsList(text, this.pageIndex, this.pageSize);
      });
  }


  ngOnInit() {
    this.getOrganizationsList();
  }

  public getOrganizationsList(title = this.searchOrganization, page = this.pageIndex, size = this.pageSize): void {
    this.userRole = localStorage.getItem('User-Role');
    this.spinner.show();
    this.pageIndex = page;
    this.pageSize = size;

    const observable = title ?
      this.organizationsService.searchOrganization(title, page, size) :
      this.organizationsService.getOrganizations(page, size);

    observable
      .subscribe((data) => {
        this.spinner.hide();
        this.organizationsLength = data['pages'];
        this.organizationsList = data['message'];
      }, (error) => {
        this.spinner.hide();
      });
  }



  public openCreateOrganizationDialog(e): void {
    const dialogRef = this.dialog.open(CreateOrganizationModalComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  public deleteOrganizations(e): void {
    const dialogRef = this.dialog.open(DeleteDocModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.organizationsService.deleteOrganization(e.id).subscribe(org => {
          this.toastr.success(org.message);
          this.spinner.hide();
          this.ngOnInit();
        }, (error => {
          this.spinner.hide();
          this.toastr.error(error.error.message);
        }));
      }
    });

  }

  public editOrganizations(e): void {
  }
}
