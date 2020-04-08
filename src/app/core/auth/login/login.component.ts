import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SpinnerService} from 'src/app/shared/services/spinner.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public emailPattern = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
  private role;

  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
  }

  public submitForm(): void {
    this.spinner.show();
    this.auth.login(this.loginForm.value).subscribe(res => {
        this.role = localStorage.getItem('User-Role') === 'ROLE_SIMPLE_USER';
        this.spinner.hide();
        if (this.role) {
          this.router.navigate(['/main/users/profile/assignments']);
        } else {
          this.router.navigate(['/main']);
        }
      },
      error => {
        this.toastr.error('Your email or password is incorrect');
      });
  }
}
