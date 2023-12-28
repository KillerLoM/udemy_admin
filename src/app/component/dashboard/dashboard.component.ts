import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isTime = false;
  isTrip = false;
  isList = false;
  isBusType = false;
  isOn = false;
  show = '';
  Type = '';
  active : HTMLElement | null = null;
  hide = true;
  iconList = '';
  isWine = false;
  isCertificate = false;
  hours : any | null = 0;
  mins : any | null = 0;
  sec : any | null = 0;
  constructor(){
    this.iconList = 'chevron_right';
    this.Type = " Chào mừng admin đã đến với trang web quản lý nhà xe. Chúc anh chị có ngày làm việc tốt lành ";
    if(!this.isTime && !this.isTrip){
      setInterval(() => {
        this.updateTime();
      })
    }
  }
  updateTime(){
      let currentTime = new Date();
      this.hours = (currentTime.getHours() < 10 ?"0":"") + currentTime.getHours();
      this.mins = (currentTime.getMinutes() < 10 ?"0":"") + currentTime.getMinutes();
      this.sec = (currentTime.getSeconds() < 10 ?"0":"") + currentTime.getSeconds();
  }
  HandleNews(element: any){
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
    console.log(this.active?.className);
    if(this.active?.className == 'menu-news active'){
      this.reset();
      this.isCertificate = true;
      this.isOn = true;
      this.isList = true;
      this.list();
    }
  }
  HandleList(element: any){
    this.hide = false;
    this.iconList = 'expand_more';
    if(this.active?.className != undefined){
      this.active.classList.remove('active');
    }
    this.active = document.querySelector('.menu-list') as HTMLElement;
    this.active?.classList.add('active-menu');
   
    console.log(this.active?.className);
  }
  timeInput(){
    this.reset();
    this.isTime = true;
    this.isOn = true;
    document.getElementById("time")?.setAttribute("style","font-weight : bold;");
  }
  tripInput(){
    this.reset();
    this.isTrip = true;    
    this.isOn = true;
    document.getElementById("trip")?.setAttribute("style","font-weight : bold;");
  }
  busInput(){
    this.reset();
    this.isBusType = true;
    this.isOn = true;
    document.getElementById("bus")?.setAttribute("style","font-weight : bold;");
  }
  list(){
    this.reset();
    this.isList = true;
    this.isOn = true;
    document.getElementById("list")?.setAttribute("style","font-weight : bold;");
  }
  reset(){
    this.isTime = false;
    this.isTrip = false;
    this.isCertificate = false;
    this.isBusType = false;
    this.isList = false;
    document.getElementById("time")?.setAttribute("style","font-weight : normal;");  
    document.getElementById("trip")?.setAttribute("style","font-weight : normal;");
    document.getElementById("bus")?.setAttribute("style","font-weight : normal;");
    document.getElementById("list")?.setAttribute("style","font-weight : normal;");
  }
  public HandleEvent($event: any) : void{
    this.show = $event;
    this.Type  =  'Danh sách Sâm'
  }
  certificateInput(){

  }
}
