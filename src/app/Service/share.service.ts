import { Injectable } from '@angular/core';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  idUser: number | null = null;
  user: User | null = null;
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
  setUser(userInput: User){
    this.user = userInput;
  }
  getUser(){
    return this.user;
  }
}
