import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrlApp: string;
  constructor(
    private http: HttpClient
  ) {
    this.baseUrlApp = environment.baseUrl;
  }

  public create(url: string, data: any) {
    return this.http.post<any>(`${this.baseUrlApp}${url}`, data, {});
  }

  public update(url: string, data: any, id: number) {
    return this.http.put<any>(`${this.baseUrlApp}${url}/${id}`, data, {});
  }

  public delete(url: string, id: number) {
    return this.http.delete<any>(`${this.baseUrlApp}${url}/${id}`, {});
  }

  public getById(url: string, id): any {
    return this.http.get<any>(`${this.baseUrlApp}${url}/${id}`, {});
  }

  public getByParams(url: string, data: any) {
    const keyData = Object.keys(data);
    let httpparams = new HttpParams();
    for (const key of keyData) {
      httpparams = httpparams.set(key, data[key]);
    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(`${this.baseUrlApp}${url}`, { headers: httpHeaders, params: httpparams });
  }
}
