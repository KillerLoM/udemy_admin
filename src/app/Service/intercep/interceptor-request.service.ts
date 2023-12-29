import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorRequestService implements HttpInterceptor{
  constructor(
    @Inject(Router) private route: Router
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      if(localStorage.getItem('token') != null){
        const token = localStorage.getItem("token");
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set("Access-Control-Allow-Origin", "*")
        .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
          const AuthRequest = req.clone({ headers: headers , withCredentials: true});
          return next.handle(AuthRequest);
      }
      else{
        this.route.navigate(['login']);
        return next.handle(req);
      }
    }
  
}
