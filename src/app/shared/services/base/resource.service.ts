import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { Pagination } from './../../models/base/pagination.model';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  throwError } from 'rxjs';
@Injectable()
export abstract class ResourceService<T> {

  protected path: String;

  constructor(
    private apiService: ApiService,private httpClient: HttpClient
  ) { }

  abstract getPath(): string;

  create(model: T): Observable<T> {
    return this.apiService.post(this.getPath(), model); 
  }

  update(model: T, id: any): Observable<T> {
    return this.apiService .put(`${this.getPath()}/${id}`, model);
  }

  delete(id: any): Observable<T> {
    return this.apiService.delete(`${this.getPath()}/${id}`);
  }

  load(id: any): Observable<T> {
    return this.apiService.get(`${this.getPath()}/${id}`);
  }

   getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.getPath())
    .pipe(
      catchError(this.errorHandler)
    )
  }
  loadAll(params: any = []): Observable<Pagination<T>> {
    if (params.page) {
      params.page--;
    }
    return this.apiService.get(this.getPath(), params).pipe(
      map(data => {
      data.number++;
      return data as Pagination<T>
    }));
    
  }
  
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}
