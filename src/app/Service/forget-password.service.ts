import { Inject, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Response/generic-response';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  url = '';
  constructor(
    private appService: AppService,
    @Inject(HttpClient) private http: HttpClient
  ) {
    this.url = this.appService.getUrlAuth() + 'forgot-password';
   }
   forgetPassword(email: string): Observable<GenericResponse>{
    let obj = {email: email}
    return this.http.post<GenericResponse>(`${this.url}`, obj);
   }
}

