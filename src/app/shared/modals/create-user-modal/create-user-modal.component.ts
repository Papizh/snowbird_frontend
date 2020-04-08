import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {ToastrService} from 'ngx-toastr';
import {SpinnerService} from '../../services/spinner.service';
import {OrganizationsService} from 'src/app/services/organizations.service';
import {map, startWith, tap, mergeMap, filter} from 'rxjs/operators';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {

  public inviteUserForm: FormGroup;
  public emailPattern = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';

  stateCtrl = new FormControl();
  filteredStates;
  organization;
  states = [];
  private userRole: string;

  constructor(
    public dialogRef: MatDialogRef<CreateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataList: any,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private organizationsService: OrganizationsService,
    private usersService: UsersService) {

    this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        filter(value => !!value),
        mergeMap(value => this.getOrganizations(value)),
        tap((res) => console.log(res))
      ).subscribe(res => this.filteredStates = res);
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('User-Role');
    this.initForm();

  }

  public initForm(): void {
    this.inviteUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      formRole: new FormControl('', Validators.required),
      organizationId: new FormControl('')
    });
  }

  disableSave() {
    const choosenRole = this.inviteUserForm.value.formRole;
    return this.inviteUserForm.invalid ||
          (this.userRole === 'ROLE_ADMINISTRATOR' && choosenRole !== 'ADMINISTRATOR' && !(this.organization && this.organization.id));
  }

  public createInvite() {
    this.spinner.show();
    let body;
    body = {
      email: this.inviteUserForm.value.email,
      userRole: this.inviteUserForm.value.formRole
    };
    if (this.userRole !== 'ROLE_ORGANIZATION_MODERATOR') {
      body.organizationId = this.inviteUserForm.value.formRole !== 'ADMINISTRATOR' ? this.organization.id : null;
    }
    this.usersService.inviteUser(body).subscribe(res => {
      this.toastr.success(res.message);
      this.spinner.hide();
      this.dialogRef.close(res);
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.error.message);
      this.dialogRef.close(error);
    });
  }


  public getOrganizations(value) {
    return this.organizationsService.getAutocompliteOrganizations(value.name || value )
      .pipe(
        map((res) => res['message']),
        tap((res) => console.log(res))
      );
  }

  displayFn(org) {
    return org ? org.name : undefined;
  }

  select($event) {
    this.organization = $event.option.value;
  }

  roleChange() {
    // this.organization = {};
  }
}
