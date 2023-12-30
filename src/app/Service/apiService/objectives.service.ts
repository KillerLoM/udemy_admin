import { Inject, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponse } from 'src/app/Response/single-response';
import { Objectives } from 'src/app/Model/objectives';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesService {
  url = '';
  constructor(
    private appService: AppService,
    @Inject(HttpClient) private http: HttpClient) {
      this.url = this.appService.getUrlObjectives();
    }
    getObjectives(): Observable<any>{
      return this.http.get(`${this.url}`).pipe();
    }
    addNewObjectives(courseId: number, data: string[]): Observable<SingleResponse>{
      let obj = {courseId:courseId,objectives: data  }
      return this.http.post<SingleResponse>(`${this.url}`, obj).pipe();
    }
    getObjectivesList(id: number): Observable<any>{
      return this.http.get<any>(`${this.url}course/${id}`).pipe();
    }
}
