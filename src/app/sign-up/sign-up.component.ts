import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../Service/apiService/auth-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Route, Router, RouterLink } from '@angular/router';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  validateForm: FormGroup<{
    name: FormControl<string>;
    userName: FormControl<string>;
    password: FormControl<string>;
    confirmpass: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmpass: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  constructor(private fb: NonNullableFormBuilder,
    @Inject(AuthServiceService) private authService:AuthServiceService,
    private message: NzMessageService,
    @Inject(Router)private route: Router) {
    
  }
  handleChangePassword(){
    let element = document.getElementById("password") as HTMLElement;
    if(element)
    element.classList.add("focus");
  }
  handleChangeEmail(){
    let element = document.getElementById("email") as HTMLElement;
    if(element)
    element.classList.add("focus");
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.validateForm.reset();
      this.resetFocus();
    }, 100);
  }
  
  resetFocus(){
    let element = document.getElementById("password") as HTMLElement;
    let input = document.getElementById("inputPassword") as HTMLInputElement;
    if(element && input.value == "") {
    element.classList.remove("focus");
    }
    element = document.getElementById("email") as HTMLElement;
    input = document.getElementById("inputEmail") as HTMLInputElement;
    if (element && input.value == "") {
      element.classList.remove("focus");
    }
    element = document.getElementById("name") as HTMLElement;
    input = document.getElementById("inputName") as HTMLInputElement;
    if(element && input.value == "" )
    element.classList.remove("focus");
    element = document.getElementById("confirm") as HTMLElement;
    input = document.getElementById("confirmPass") as HTMLInputElement;
    if(element && input.value =="")
    element.classList.remove("focus");
  }
  handleSignUp(): void {
    if (this.validateForm.valid) {
      const fullname = this.validateForm.get('name')!.value;
      const userName = this.validateForm.get('userName')!.value;
      const password = this.validateForm.get('password')!.value;
      let confirmPassword = this.validateForm.get('confirmpass')!.value;
      this.authService.signUpHandle(fullname, userName, password, confirmPassword).subscribe(
        (response) => {
          alert(1);
              if(response.success) {
                
             
              this.message
              .loading('Đang đăng ký tài khoản', { nzDuration: 1000 })
              .onClose!.pipe(
                concatMap(() => this.message.success('Đã đăng ký thành công', { nzDuration: 2500 }).onClose!),
                concatMap(() => this.message.info('Bạn sẽ quay lại màn hình đăng nhập', { nzDuration: 2500 }).onClose!)
              )
              .subscribe(() => {
              });
              }
              this.route.navigate(['login'])
        },
        (error) => {
          this.message.create('error', `Đã có lỗi trong quá trình tạo tài khoản`);
          this.validateForm.reset();
          this.resetFocus();
        }
      );
    }
  }
  handleChangeName(){
    let element = document.getElementById("name") as HTMLElement;
    if(element)
    element.classList.add("focus");
  }
  handleChangeConfirm(){
    let element = document.getElementById("confirm") as HTMLElement;
    if(element)
    element.classList.add("focus");
  }
}
