import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { GenericResponse } from 'src/app/Response/generic-response';
import { AuthServiceService } from 'src/app/Service/apiService/auth-service.service';
import { CourseService } from 'src/app/Service/apiService/course.service';
import { ShareService } from 'src/app/Service/share.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdd = false;
  isGet = false;
  isAccount = false;
  isList = false;
  isLessons = false;
  isLoading = true;
  isOn = false;
  show = '';
  isVisible = true;
  Type = '';
  active : HTMLElement | null = null;
  hide = true;
  iconList = '';
  constructor(    @Inject(Router) private route: Router,
  @Inject(AuthServiceService) private authService: AuthServiceService,
  @Inject(CourseService) private courseService: CourseService,
  private shareService: ShareService){
    this.iconList = 'chevron_right';

    this.validateUser();
  }
  ngOnInit(): void {

  }

  HandleAccount(element: any){
    const element1 = element;
    console.log(element1);
    if(this.active?.className != undefined){
      this.active.classList.remove('active-menu');
      this.hide = true;
      this.iconList = 'chevron_right';
      this.active.classList.remove('active');
    }
    if(element.target.nodeName == 'DIV'){
      this.active = element.target;
    }
    else{
      this.active = element.target.parentNode;
    }
   
    this.active?.classList.add('active');
    if(this.active?.className == 'menu-account active'){
      this.reset();
      this.isAccount = true;
      this.isOn = true;
    }
    this.Type = 'Quản lý tài khoản';
  }
  HandleList(element: any){
    this.hide = false;
    this.iconList = 'expand_more';
    if(this.active?.className != undefined){
      this.active.classList.remove('active');
    }
    this.active = document.querySelector('.menu-list') as HTMLElement;
    this.active?.classList.add('active-menu');
    this.Type = 'Quản lý các khóa học'
  }
  addCourses(){
    this.reset();
    this.isAdd = true;
    this.isOn = true;
    document.getElementById("addCourse")?.setAttribute("style","font-weight : bold;");
  }
  getReview(){
    this.reset();
    this.isGet = true;    
    this.isOn = true;
    document.getElementById("review")?.setAttribute("style","font-weight : bold;");
  }
  lessonsHandle(){
    this.reset();
    this.isLessons = true;
    this.isOn = true;
    document.getElementById("edit")?.setAttribute("style","font-weight : bold;");
  }
  reset(){
    this.isAdd = false;
    this.isGet = false;
    this.isAccount = false;
    this.isLessons = false;
    this.isList = false;
    document.getElementById("addCourse")?.setAttribute("style","font-weight : normal;");  
    document.getElementById("review")?.setAttribute("style","font-weight : normal;");
    document.getElementById("edit")?.setAttribute("style","font-weight : normal;");
    document.getElementById("list")?.setAttribute("style","font-weight : normal;");
  }
  validateUser(){
    this.authService.getInfoUser().subscribe((data: User) =>{
      this.shareService.setIdUser(data.userDTO.id);
      this.courseService.getCourse(data.userDTO.id).subscribe((data: any) => {
        this.shareService.setCourses(data);
      });
      this.shareService.setUser(data);
      this.authService.validateToken().subscribe((data: GenericResponse) =>{
        this.isLoading = false;
        let btn = document.getElementById('menu-account-id') as HTMLButtonElement;
        if(btn)
        btn.click();
      },
      Error=>{
        this.route.navigate(['login']);
      })
    },
    Error => {
      this.route.navigate(['login']);
    })

  }
}
