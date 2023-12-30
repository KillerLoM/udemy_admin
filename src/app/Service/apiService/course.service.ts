import { Inject, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from 'src/app/Model/courses';
import { GenericResponse } from 'src/app/Response/generic-response';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url = '';
  constructor(
    private appService: AppService,
    @Inject(HttpClient) private http: HttpClient
  ) { }
  createCourse(title: string, subtitle: string, category: string, thumbUrl: string, price: number): Observable<any>{
    this.url = this.appService.getUrlCourses();
    let obj = {title: title, subtitle: subtitle, category: category, rating: 0, thumbUrl:thumbUrl, price: price};
    return this.http.post(`${this.url}`, obj).pipe();
  }
  getCourse(id: number) : Observable<Courses[]> {
    this.url = this.appService.getUrlCourses();
    return this.http.get<Courses[]>(`${this.url}/teacher/${id}`).pipe();
  }
  deleteCourse(id: number) : Observable<GenericResponse>{
    return this.http.delete<GenericResponse>(`${this.url}/${id}`).pipe();
  }
  getDetailCourse(id: number) : Observable<Courses>{
    return this.http.get<Courses>(`${this.url}/id/${id}`).pipe();
  }
  updateCourse(id: number, title: string, subtitle: string, category: string, thumbUrl: string, price: number) : Observable<any>{
    let obj = {title: title, subtitle: subtitle, category: category,rating:0, thumbUrl: thumbUrl, price: price}
    return this.http.put(`${this.url}/${id}`, obj).pipe();
  }
}
