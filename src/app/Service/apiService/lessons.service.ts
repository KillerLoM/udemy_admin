import { Inject, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
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
  getLessons(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`).pipe();
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
    return this.http.put(`${this.url}/${courseId}`, obj).pipe();
  }
  deleteLessons(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe();
  }
}
