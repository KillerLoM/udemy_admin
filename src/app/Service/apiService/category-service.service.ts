import { Inject, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Model/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  url  = '';
  constructor(
    private appSerivce: AppService,
    @Inject(HttpClient) private http: HttpClient,
  ) {
    this.url = this.appSerivce.getUrlCourses();
   }
   getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`).pipe();
   }
}
