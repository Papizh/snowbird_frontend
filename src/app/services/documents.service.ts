import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';


import {DocumentPass} from '../new-document/models/document-pass.interface';
import {DocumentType} from '../new-document/models/document-type.interface';


export class InterceptorHttpParams extends HttpParams {
  constructor(
    public interceptorConfig: { modeMultipart: boolean },
    params?: { [param: string]: string | string[] }
  ) {
    super({fromObject: params} as HttpParamsOptions);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  apiUrl = environment.apiUrl;
  complains = [];
  regularDocs = [];
  DEFAULT_DOCUMENTS_SIZE = 10;
  DEFAULT_DOCUMENTS_PAGE = 0;

  constructor(private http: HttpClient) {
  }

  public getDocuments(
    page = this.DEFAULT_DOCUMENTS_PAGE,
    size = this.DEFAULT_DOCUMENTS_SIZE,
    type = DocumentType.REGULAR_DOCUMENT) {

    if (type === DocumentType.COMPLAINT_RESULTS) {
      return this.getUserDocumentAnswersComplaints(page, size);
    }
    const role = localStorage.getItem('User-Role') === 'ROLE_ADMINISTRATOR' ? 'global' : 'internal';
    return this.http.get(`${this.apiUrl}api/v1/a/document/get/${role}?page=${page}&size=${size}&type=${type}`);
  }

  public getUserDocumentAnswersComplaints(
    page = this.DEFAULT_DOCUMENTS_PAGE,
    size = this.DEFAULT_DOCUMENTS_SIZE) {

    return this.http.get(`${this.apiUrl}api/v1/a/document/complaint/get?page=${page}&size=${size}`);
  }

  public getAssignmentDocuments(
    page = this.DEFAULT_DOCUMENTS_PAGE,
    size = this.DEFAULT_DOCUMENTS_SIZE) {

    return this.http.get(`${this.apiUrl}api/v1/a/assignment/documents/get?page=${page}&size=${size}`);
  }

  public deleteDocument(id: number): Observable<any> {
    const docs = this.regularDocs;
    docs.splice(id, 1);
    this.regularDocs = docs;
    return this.http.patch(`${this.apiUrl}api/v1/a/document/delete`, {id});
  }

  public getUserDocumentList(data: any[]): Observable<any[]> {
    const tempDoc = [];
    data.forEach(item => {
      this.regularDocs.filter(doc => {
        if (doc.position === item) {
          tempDoc.push(doc);
        }
      });
      this.complains.filter(doc => {
        if (doc.position === item) {
          tempDoc.push(doc);
        }
      });
    });
    return of(tempDoc);
  }

  public assignDocuments(name = '', documents = [], users = []) {
    const mappedDocuments = documents.map((document) => ({
      id: document.id,
      orderInAssignment: document.orderInAssignment
    }));
    const mappedUsers = users.map((user) => ({id: user.id}));

    return this.http.post(`${this.apiUrl}api/v1/a/assignment/create`,
      {name: name, documents: mappedDocuments, users: mappedUsers});
  }

  public getStructure(documentId: number, simpleUser = false) {
    const role = localStorage.getItem('User-Role') === 'ROLE_SIMPLE_USER' ? 'su' : 'a';
    return this.http.get(`${this.apiUrl}api/v1/${role}/document/get/structure?documentId=${documentId}`);
  }

  public createDocumentAnswer(documentAnswers: DocumentPass) {
    const formData = new FormData();

    formData.append('json', JSON.stringify(documentAnswers));
    formData.append('files', JSON.stringify(null));

    return this.http.post(`${this.apiUrl}api/v1/su/document/answer/create`, formData,
      {
        headers: new HttpHeaders({
          'no-content-type': 'false',
        })
      });
  }

  public searchDocument(documentType = DocumentType.REGULAR_DOCUMENT,
                        name = '',
                        page = this.DEFAULT_DOCUMENTS_PAGE,
                        size = this.DEFAULT_DOCUMENTS_SIZE,
                        published = false): Observable<any> {
    const body = {
      name: name,
      page: page,
      size: size
    };

    if (documentType === DocumentType.COMPLAINT_RESULTS) {
      return this.getComplaintResultsByName(body);
    }

    if (documentType !== DocumentType.ALL) {
      body['documentType'] = documentType;
    }

    const publishedStr = published ? 'published' : '';
    return this.http.post(`${this.apiUrl}api/v1/a/document/search/${publishedStr}`, body);
  }

  public getComplaintResultsByName(body): Observable<any> {
    return this.http.post(`${this.apiUrl}api/v1/a/document/complaint/search`, body);
  }

  public getUserDocumentAnswer(documentAnswerId: number): Observable<any> {
    const role = localStorage.getItem('User-Role') === 'ROLE_SIMPLE_USER' ? 'su' : 'a';
    return this.http.get(`${this.apiUrl}api/v1/${role}/document/answer/get?documentAnswerId=${documentAnswerId}`);
  }

  public getDownloadLink(documentId: number, documentAnswerId: number, fileName: string): Observable<any> {
    const role = localStorage.getItem('User-Role') === 'ROLE_SIMPLE_USER' ? 'su' : 'a';
    return this.http.post(`${this.apiUrl}api/v1/${role}/get/attached/file/`, { documentId, documentAnswerId, fileName },
      { responseType: 'blob' });
  }
}
