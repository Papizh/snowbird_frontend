import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth-service/auth.service';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {map, filter, mergeMap} from 'rxjs/operators';
import {SpinnerService} from 'src/app/shared/services/spinner.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordConfirm').value && control.dirty);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  inviteCode: string;
  public emailPattern = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';

  constructor(private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private spinner: SpinnerService,
              private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => this.checkToken(), 0);
    this.initForm();
    this.getInviteToken();
  }

  public initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'),
        Validators.required
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required
      ])
    }, {
      validators: this.checkPasswords
    });
  }

  public checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirm.value;
    return pass === confirmPass ? null : {notSame: true};
  }

  public getInviteToken(): void {
    this.activatedRoute.queryParams.subscribe(map => {
      this.inviteCode = map.token;
    });
  }

  public checkToken() {
    this.spinner.show();
    const token = this.activatedRoute.snapshot.queryParams.token;
    this.auth.validateRegisterToken(token)
      .subscribe((response) => {
          this.spinner.hide();
        },
        ({error}) => {
          this.toastr.error(error.error.message);
          this.spinner.hide();
        });
  };

  public submitForm(): void {
    this.checkPasswords(this.registerForm);
    this.registerForm.value.token = this.inviteCode;
    this.auth.singUp(this.registerForm.value).subscribe((response) => {
      this.toastr.success(response['message']);
      this.router.navigate(['/login']);
    }, (error) => {
      const message = typeof error === 'object' ? 'Something goes wrong' : error;
    });
  }
}
