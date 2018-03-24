import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TError, TToken, THttpHandler } from '../struct/types';
import { authkey } from '../struct/enums';

@Injectable()
export class MainService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:8080';
  }

  /** GET: get data from server */
  httpGet(url: string, headers: Object, callback?: THttpHandler) {
    const dest = this.baseURL + url;
    responseObservable(this.http.get<any>(dest,  {observe: 'response', headers: getHeaders(headers)}), callback);
  }

  /** POST: send data to server */
  httpPost(url: string, data: any, headers: Object, callback?: THttpHandler) {
    const dest = this.baseURL + url;
    responseObservable(this.http.post<any>(dest, data, {observe: 'response', headers: getHeaders(headers)}), callback);
  }

  /** PATCH: send data to server */
  httpPatch(url: string, data: any, headers: Object, callback?: THttpHandler) {
    const dest = this.baseURL + url;
    responseObservable(this.http.patch<any>(dest, data, {observe: 'response', headers: getHeaders(headers)}), callback);
  }

  /** DELETE: send data to server */
  httpDelete(url: string, headers: Object, callback?: THttpHandler) {
    const dest = this.baseURL + url;
    responseObservable(this.http.delete<any>(dest, {observe: 'response', headers: getHeaders(headers)}), callback);
  }

  /** Store Token for authentication */
  setAuth(token: TToken) {
    setToken(authkey, token);
  }

  /** Delete Token for authentication */
  delAuth() {
    deleteToken(authkey);
  }

  /** Get Token for authentication */
  getAuth(): TToken | undefined {
    // deleteToken(authkey);
    return getToken(authkey);
  }
}
/*---------------------------------------------------*/
function getHeaders(headerData: any) {
  return new HttpHeaders({'Accept': 'application/json', ...headerData});
}
/*---------------------------------------------------*/
function responseObservable(obs: Observable<any>, callback?: THttpHandler) {
  obs.subscribe(
    res => {
      callback && callback({status: res.status, data: res.body});
    },
    err => {
      callback && callback({status: 0}, err.error);
    }
  );
}
/*---------------------------------------------------*/
/*---------------------------------------------------*/
function setToken(tokenName: string, tokenObject: TToken) {
  if (typeof(Storage) !== 'undefined') {
      const token = JSON.stringify(tokenObject);
      localStorage.setItem(tokenName, token);
      return true;
  } else {
      alert('Your Browser does not have support for this site');
      return false;
  }
}
/*---------------------------------------------------*/
function getToken(tokenName: string): TToken | undefined {
  if (typeof(Storage) !== 'undefined') {
      const tokenStr = localStorage.getItem(tokenName);
      if (tokenStr) {
        let token = JSON.parse(tokenStr);
        return token;
      }
  } else {
      alert('Your Browser does not have support for this site');
  }
  return undefined;
}
/*---------------------------------------------------*/
function deleteToken(tokenName: string) {
  if (typeof(Storage) !== 'undefined') {
      localStorage.removeItem(tokenName);
      return true;
  } else {
      alert('Your Browser does not have support for this site');
      return false;
  }
}
/*---------------------------------------------------*/