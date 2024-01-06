import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ForgetPasswordService } from 'src/app/Service/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  isLoading = false;
  isFinish = false;
  showOverlay() {
    this.isLoading = true;
  }

  hideOverlay() {
    this.isLoading = false;
  }
  inputEmail = '';
  constructor(private message: NzMessageService,
    private modal: NzModalService,
    private forgetPass: ForgetPasswordService,
    @Inject(Router) private router: Router) {}

  handleInputEmail() {
    // Sử dụng biểu thức chính quy để kiểm tra xem email có chứa @gmail.com hay không
    const regex = /@gmail\.com$/;
    
    if (regex.test(this.inputEmail)) {
      this.message.success('Đã xác nhận với email: ' + this.inputEmail + ' vui lòng chờ');
      console.log(this.inputEmail);
      this.showOverlay();
      this.forgetPass.forgetPassword(this.inputEmail).subscribe((data: any)=>{
        this.isFinish = true;
        this.hideOverlay();
      }, Error =>{
        this.hideOverlay();
        this.message.error('Đã có lỗi ' );
      })
      
    }
    else{
      this.message.error('Vui lòng nhập email có định dạng là : example@gmail.com');
      this.inputEmail ='';
    }
  }
  routeFeducationStudent(){
    let btn = document.getElementById("student") as HTMLButtonElement;
    btn.click();
  }
  routeFeducationTeacher(){
    this.router.navigate(['']);
  }
}
