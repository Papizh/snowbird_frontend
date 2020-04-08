import {Injectable} from '@angular/core';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private router: Router,
              private http: HttpClient) {
  }

  public login(data: User): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.apiUrl}public/login`, data);
  }

  public singUp(data) {
    return this.http.post(`${this.apiUrl}private/registration`, data);
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('User-Role');
    this.router.navigate(['/login']);
    return this.http.delete(`${this.apiUrl}private/logout`).subscribe(() => {
    });
  }

  public validateToken(token): Observable<any> {
    return this.http.post(`${this.apiUrl}private/registration/page/show`, {token});
  }

  public validateRegisterToken(token): Observable<any> {
    return this.http.post(`${this.apiUrl}private/registration/page/show`, {token});
  }
}


