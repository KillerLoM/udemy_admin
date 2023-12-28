import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'http://localhost:9000/api'
  constructor() {

   }
   getUrlAuth(){
    return this.url +'/auth/';
   }
}
