import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganizationsService} from '../../../services/organizations.service';
import {ToastrService} from 'ngx-toastr';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-create-organization-modal',
  templateUrl: './create-organization-modal.component.html',
  styleUrls: ['./create-organization-modal.component.scss']
})
export class CreateOrganizationModalComponent implements OnInit {

  public registerOrganization: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateOrganizationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataList: any,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private organizationsService: OrganizationsService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.registerOrganization = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
    });
  }

  public createOrganization() {
    this.spinner.show();
    this.organizationsService.createOrganization(this.registerOrganization.value.name).subscribe(res => {
      this.toastr.success(res['message']);
      this.dialogRef.close(res);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message);
      this.dialogRef.close(error);
    });
  }
}
