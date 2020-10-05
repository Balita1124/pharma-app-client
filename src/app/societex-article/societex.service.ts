import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocietexService {

  articleUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.articleUrl = environment.articleUrl;
  }

  public create(url: string, data: any) {
    return this.http.post<any>(`${this.articleUrl}${url}`, data, {});
  }

  public update(url: string, data: any, id: number) {
    return this.http.put<any>(`${this.articleUrl}${url}/${id}`, data, {});
  }

  public delete(url: string, id: number) {
    return this.http.delete<any>(`${this.articleUrl}${url}/${id}`, {});
  }

  public getById(url: string, id): any {
    return this.http.get<any>(`${this.articleUrl}${url}/${id}`, {});
  }

  public getByParams(url: string, data: any) {
    const keyData = Object.keys(data);
    let httpparams = new HttpParams();
    for (const key of keyData) {
      httpparams = httpparams.set(key, data[key]);
    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(`${this.articleUrl}${url}`, { headers: httpHeaders, params: httpparams });
  }
}
