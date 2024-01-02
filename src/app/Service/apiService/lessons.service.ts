import { Inject, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lessons } from 'src/app/Model/lessons';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  url = '';
  constructor(
    private appService: AppService,
    @Inject(HttpClient) private http: HttpClient
  ) {
    this.url = this.appService.getUrlLessons();
  }
  getLessons(id: number, page: number): Observable<any> {
    let params = new HttpParams().set("page", page);
    return this.http.get<any>(`${this.url}/${id}`,{params}).pipe();
  }
  postLessons(
    name: string,
    video_url: string,
    courseId: number,
    position: number
  ): Observable<any> {
    let obj = {
      lessonName: name,
      video_url: video_url,
      courseId: courseId,
      position: position,
    };
    return this.http.post(`${this.url}`, obj).pipe();
  }
  putLessons(
    id: number,
    name: string,
    video_url: string,
    courseId: number,
    position: number
  ): Observable<any> {
    let obj = {
      lessonName: name,
      video_url: video_url,
      courseId: courseId,
      position: position,
    };
    return this.http.put(`${this.url}/${id}`, obj).pipe();
  }
  deleteLessons(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe();
  }
  getLessonByPosition(position: number, id_course: number): Observable<Lessons>{
    let params = new HttpParams().set("id_course", id_course);
    return this.http.get<Lessons>(`${this.url}/detail/${position}`,{params}).pipe();
  }
}
