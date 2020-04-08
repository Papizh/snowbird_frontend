import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private router: Router,
              private toastr: ToastrService) {}

  canActivate(): Observable<boolean> | boolean {
    const role: string = localStorage.getItem('User-Role');

    if (role === 'ROLE_ADMINISTRATOR' ) {
      return true;
    } else {
      this.toastr.warning('You have no rights for that page');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
