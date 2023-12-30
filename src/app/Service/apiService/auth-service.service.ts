import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from 'src/app/Response/login-response';
import { Observable, of, throwError } from 'rxjs';
import { SignUpResponse } from 'src/app/Response/sign-up-response';
import { User } from 'src/app/Model/user';
import { GenericResponse } from 'src/app/Response/generic-response';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  url = ''
  constructor(
    private appService: AppService,
    private http: HttpClient
  ) { 
    
  }
  loginHandle(email: string, password: string): Observable<LoginResponse> {
    this.url = this.appService.getUrlAuth() ;
    let obj = { email: email, password: password}
    return this.http.post<LoginResponse>(`${this.url}login`, obj).pipe();
  }
  signUpHandle(fullname: string, email: string, password: string, confirmPass: string): Observable<SignUpResponse> {
    this.url = this.appService.getUrlAuth() ;
    let obj = {fullname: fullname, email: email, password: password, confirmPass, userRole : "ROLE_TEACHER"};
    return this.http.post<SignUpResponse>(`${this.url}register`, obj).pipe();
  }
  getInfoUser(): Observable<User> {
    this.url = this.appService.getUrlProfile();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User>(`${this.url}`,{headers}).pipe();
  }
  validateToken(): Observable<GenericResponse> {
    this.url = this.appService.getUrlAuth();
    const token = localStorage.getItem('token');

    if(token){
      let obj = {token: token}
      return this.http.post<GenericResponse>(`${this.url}validate-token`, obj).pipe();
    }
    return throwError({ success: false, message: "Lỗi: Token không tồn tại" });
  }
}
