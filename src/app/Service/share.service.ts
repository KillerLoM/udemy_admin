import { Injectable } from '@angular/core';
import { User } from '../Model/user';
import { Courses } from '../Model/courses';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  idUser: number | null = null;
  idCourse: number | null = null;
  user: User | null = null;
  listCourses: Courses[];
  constructor() { 
      this.listCourses = [];
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
  setIdCourse(id: number){
    this.idCourse = id;
  }
  getIdCourse(){
    return this.idCourse;
  }
  setCourses(input: Courses[]){
    this.listCourses = input;
  }
  getCourses(){
    return this.listCourses;
  }
}
