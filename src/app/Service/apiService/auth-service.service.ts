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
    this.url = this.appService.getUrlAuth();
  }
  loginHandle(email: string, password: string): Observable<LoginResponse> {
    
    let obj = { email: email, password: password}
    return this.http.post<LoginResponse>(`${this.url}login`, obj).pipe();
  }
  signUpHandle(fullname: string, email: string, password: string, confirmPass: string): Observable<SignUpResponse> {
    this.url = this.appService.getUrlAuth() ;
    let obj = {fullname: fullname, email: email, password: password, confirmPass, userRole : "ROLE_TEACHER"};
    return this.http.post<SignUpResponse>(`${this.url}register`, obj).pipe();
  }
  getInfoUser(): Observable<User> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<User>(`${this.appService.getUrlProfile()}`,{headers}).pipe();
  }
  validateToken(): Observable<GenericResponse> {
    
    const token = localStorage.getItem('token');

    if(token){
      let obj = {token: token}
      return this.http.post<GenericResponse>(`${this.url}validate-token`, obj).pipe();
    }
    return throwError({ success: false, message: "Lỗi: Token không tồn tại" });
  }
  updateUser(id: number, fullname: string, email: string, createdAt: Date) : Observable<User> {
    let obj = {id: id, fullname:fullname, email:email, created:createdAt};
    this.url = this.appService.getUrlProfile();
    return this.http.put<User>(`${this.url}`, obj).pipe();
  }
  logOut() : Observable<any>{
    return this.http.post(`${this.url}logout`,{}).pipe();
  }
  changePassword(password: string, newPassword: string, confrimPassword: string): Observable<any>{
    let obj = {  
      password: password,
      newPassword: newPassword,
      confrimPassword: confrimPassword}
    return this.http.post(`${this.url}change-password`, obj).pipe();
  }
}
