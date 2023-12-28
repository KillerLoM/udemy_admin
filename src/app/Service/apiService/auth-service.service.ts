import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/app/Response/login-response';
import { Observable } from 'rxjs';
import { SignUpResponse } from 'src/app/Response/sign-up-response';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  url = ''
  constructor(
    private appService: AppService,
    private http: HttpClient
  ) { 
    this.url = this.appService.getUrlAuth() ;
  }
  loginHandle(email: string, password: string): Observable<LoginResponse> {
    let obj = { email: email, password: password}
    return this.http.post<LoginResponse>(`${this.url}login`, obj).pipe();
  }
  signUpHandle(fullname: string, email: string, password: string, confirmPass: string): Observable<SignUpResponse> {
    let obj = {fullname: fullname, email: email, password: password, confirmPass, userRole : "ROLE_TEACHER"};
    alert(1);
    return this.http.post<SignUpResponse>(`${this.url}register`, obj).pipe();
  }
}
