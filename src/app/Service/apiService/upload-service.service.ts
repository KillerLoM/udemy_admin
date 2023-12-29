import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  url = 'http://localhost:9000/api/cloudinary/upload';
  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) { }
  upload(file: File): Observable<String>{
    let headers = new Headers({'Content-Type': 'multipart/form-data'});
    let obj = {file: file}

      return this.http.post<String>(`${this.url}`,{headers}).pipe();
  }
}
