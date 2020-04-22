import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL = '';
  constructor(
    private http: Http
  ) {
    this.apiURL = environment.apiURL;
  }

  testing() {
  }

  async get(path: string) {
    const resp = await this.http.get(this.apiURL + path, this.headers).toPromise();
    return resp.json();
  }

  async post(path: string, payload: any) {
    const resp = await this.http.post(this.apiURL + path, payload, this.headers).toPromise();
    return resp.json();
  }

  async put(path: string, payload: any) {
    const resp = await this.http.put(this.apiURL + path, payload, this.headers).toPromise();
    return resp.json();
  }

  async delete(path: string) {
    const resp = await this.http.delete(this.apiURL + path, this.headers).toPromise();
    return resp.json();
  }

  async logout() {
    const resp: any = await this.http.get(this.apiURL + 'user/logout', this.headers).toPromise();
    if (resp.statusCode === 200) {
      localStorage.removeItem('id-token');
    }
    return resp.json();
  }

  get headers() {
    const token = localStorage.getItem('id_token') || null;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }
    return {
      headers,
      withCredentials: true
    };
  }
}
