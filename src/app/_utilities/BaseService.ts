import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ApiResponse} from './ApiResponse';
import {ErrorHandler} from './ErrorHandler';
import {environment} from '../../environments/environment';
import {IRecord} from "./_types/IRecord";

export abstract class BaseService<T> {

  protected httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  protected retry: number = 0;
  protected url: string = `${environment.apiUrl}`;
  protected abstract endpoint: string;

  constructor(
    protected http: HttpClient
  ) {
  }


  public findAll(jsonFilter?: any): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(`${this.url}/${this.endpoint}`)
      .pipe(
        retry(this.retry),
        catchError(ErrorHandler.handle)
      );
  }


  public find(id: string | number): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        retry(this.retry),
        catchError(ErrorHandler.handle)
      );
  }

  add(model: T): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.url}/${this.endpoint}`, model, this.httpOptions)
      .pipe(
        retry(this.retry),
        catchError(ErrorHandler.handle)
      );
  }


  update(model: T): Observable<ApiResponse<T>> {
    // @ts-ignore
    return this.http.put<ApiResponse<T>>(`${this.url}/${this.endpoint}/${model.id}`, model, this.httpOptions)
      .pipe(
        retry(this.retry),
        catchError(ErrorHandler.handle)
      );
  }

  delete(id: string | number): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.url}/${this.endpoint}/${id}`, this.httpOptions)
      .pipe(
        retry(this.retry),
        catchError(ErrorHandler.handle)
      );
  }


}
