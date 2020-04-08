import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  public getOrganizations(page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}api/v1/a/organization/get?page=${page}&size=${size}`);
  }
  public createOrganization(name: string) {
    let params = new HttpParams();
    params = params.append('organizationName', name );
    return this.http.post(`${this.apiUrl}api/v1/a/organization/create?${params}`, null);
  }

  public getOrganizationById(id, page = 0, size = 10): Observable<any>{
    const role = localStorage.getItem('User-Role') === 'ROLE_ADMINISTRATOR' ? 'belongs' : 'own';
    return this.http.get(`${this.apiUrl}api/v1/a/organization/get/${role}/users?organizationId=${id}&page=${page}&size=${size}`);
  }

  public getAdministratorOrganization(page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}api/v1/a/organization/get/admins?page=${page}&size=${size}`);
  }

  public searchOrganization(text, page = 0, size = 10): Observable<any> {
    const orgText = text ? `&text=${text}` : '';
    return this.http.get(`${this.apiUrl}api/v1/a/organization/search?page=${page}&size=${size}${orgText}`)
  }

  public getAutocompliteOrganizations(text= '') {
    const orgText = true ? `&text=${text}` : '';
    return this.http.get(`${this.apiUrl}api/v1/a/organization/autocomplete?${orgText}`);
  }
  public deleteOrganization(id): Observable<any> {
    return this.http.patch(`${this.apiUrl}api/v1/a/organization/delete`, {id});
  }
}
