import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  idUser: number | null = null;
  constructor() { 

  }
  setIdUser(id: number){
    this.idUser = id;
    console.log(this.idUser);
  }
  getIdUser(){
    console.log(this.idUser);
    return this.idUser;
  }
}
