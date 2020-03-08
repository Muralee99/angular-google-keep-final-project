
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../register';
import { User } from '../user';


@Injectable()
export class AuthenticationService {

  register: Register = new Register('','');

  constructor(private http:  HttpClient) {
  }

  authenticateUser(data) {   
    return this.http.post('http://localhost:8089/api/v1/auth/login' , data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.http.post('http://localhost:8089/api/v1/isAuthenticated', { } , {
      headers : new HttpHeaders().set('Authorization' , `Bearer ${token}`)
    }).pipe(map((res) => res['isAuthenticated'])).toPromise();
  }

  setLoggedInUser(loggedInUser){
    localStorage.setItem('loggedInUser', loggedInUser);
  }

  getLoggedInUser(){
    return localStorage.getItem('loggedInUser');
  }

}
