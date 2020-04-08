import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {OrganizationsService} from '../../services/organizations.service';
import {SpinnerService} from '../../shared/services/spinner.service';
import {MatDialog} from '@angular/material';
import {DeleteDocModalComponent} from '../../shared/modals/delete-doc-modal/delete-doc-modal.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit, OnChanges {

  @Output() editOrg = new EventEmitter();
  @Output() deleteOrg = new EventEmitter();
  @Input() organization;

  constructor(private organizationsService: OrganizationsService,
              private spinner: SpinnerService,
              public dialog: MatDialog,
              private toastr: ToastrService,
  ) {}

  ngOnInit() {
  }

  ngOnChanges(): void {
  }

  public editOrganizations(e): void {
    this.editOrg.emit(e);
  }

  public deleteOrganizations(org): void {
    this.deleteOrg.emit(org);
  }
}
