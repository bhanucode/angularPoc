import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  private setHttpHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }
  
  private formatErrors(error: any) {
   if (error.status == 401) {      
      window.location.href = error.json().loginUrl  + "&goto=" + window.location.href;
      return;
    }

    return Observable.throw(error.json());
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const options = { params: params, headers: this.setHttpHeaders() };
    return this.http.get(`${environment.api_url}${path}`,options);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body),{ headers:this.setHttpHeaders() });
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body),{ headers:this.setHttpHeaders() });
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`,{ headers:this.setHttpHeaders() });
  }
}
