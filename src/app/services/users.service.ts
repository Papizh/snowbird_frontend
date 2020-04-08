import {Injectable} from '@angular/core';
import {Observable, } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrl;
  DEFAULT_USER_SIZE = 10;
  DEFAULT_USER_SIZE_ASSIGNMENT = 25;
  DEFAULT_USER_PAGE = 0;

  constructor(private http: HttpClient) {
  }

  public getUsers(page = this.DEFAULT_USER_PAGE, size = this.DEFAULT_USER_SIZE): Observable<any> {
    const role = localStorage.getItem('User-Role') === 'ROLE_ORGANIZATION_MODERATOR' ? 'own' : 'all';
    return this.http.get(`${this.apiUrl}api/v1/a/organization/get/${role}/users?page=${page}&size=${size}`);
    // return this.http.get(`${this.apiUrl}api/v1/a/organization/get/all/users?page=${page}&size=${size}`);
  }

  public getHomeUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/v1/a/organization/get/users/home`);
  }

  public getUsersForAssignment(page = this.DEFAULT_USER_PAGE, size = this.DEFAULT_USER_SIZE_ASSIGNMENT): Observable<any> {
    return this.http.get(`${this.apiUrl}api/v1/a/assignment/users/get?page=${page}&size=${size}`);
  }

  public getUserAssignments(userId = 0, page = this.DEFAULT_USER_PAGE, size = this.DEFAULT_USER_SIZE): Observable<any> {
    if (!userId) {
      return this.http.get(`${this.apiUrl}api/v1/su/assignment/get?page=${page}&size=${size}`);
    }
    return this.http.get(`${this.apiUrl}api/v1/a/assignment/get?page=${page}&size=${size}&userId=${userId}`);
  }

  public getUserById(id = null) {
    if (!id) {
      return this.http.get(`${this.apiUrl}api/v1/su/user/get/details`);
    }
    return this.http.get(`${this.apiUrl}api/v1/a/user/get/info?userId=${id}`);
  }

  public inviteUser(user): Observable<any> {
    return this.http.post(`${this.apiUrl}api/v1/a/invite`, user);
  }

  public searchUser(name, page = this.DEFAULT_USER_PAGE, size = this.DEFAULT_USER_SIZE): Observable<any> {
    const lastName = name ? `&lastName=${name}` : '';
    return this.http.get(`${this.apiUrl}api/v1/a/user/search?page=${page}&size=${size}${lastName}`);
  }

  public searchUserinAssignment(name, page = this.DEFAULT_USER_PAGE, size = this.DEFAULT_USER_SIZE): Observable<any> {
    const lastName = name ? `&lastName=${name}` : '';
    return this.http.get(`${this.apiUrl}api/v1/a/user/assignment/search?page=${page}&size=${size}${lastName}`);
  }

  public deteteUser(id): Observable<any> {
    return this.http.patch(`${this.apiUrl}api/v1/a/user/delete`, {id});
  }
}
