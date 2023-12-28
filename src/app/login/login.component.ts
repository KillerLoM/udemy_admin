import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../Service/apiService/auth-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Token } from '@angular/compiler';
import { concatMap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  hide = true;

  isLogin = true;
  isRegister = false;
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: NonNullableFormBuilder,
    @Inject(AuthServiceService) private authService: AuthServiceService,
    @Inject(Router)private route: Router,
    private message: NzMessageService) {}
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
      const userNameControl = this.validateForm.get('userName');
      const passwordControl = this.validateForm.get('password');
  
      if (userNameControl && passwordControl) {
        const userName = userNameControl.value;
        const password = passwordControl.value;
  
        if (userName && password) {
          this.handleChangeEmail();
          this.handleChangePassword();
        }
      }
    }, 100);
  }
  
  resetFocus(){
    let element = document.getElementById("password") as HTMLElement;
    let input = document.getElementById("inputPassword") as HTMLInputElement;
    if(element && input.value == "") {
    element.classList.remove("focus");
    }
    let elementEmail = document.getElementById("email") as HTMLElement;
    let inputEmail = document.getElementById("inputEmail") as HTMLInputElement;
    if (elementEmail && inputEmail.value == "") {
      elementEmail.classList.remove("focus");
    }
  }
  handleLogin(): void {
    if (this.validateForm.valid) {
      const userName = this.validateForm.get('userName')!.value;
      const password = this.validateForm.get('password')!.value;
      const id = this.message.loading('Đang đăng nhập ..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 1000);
      this.authService.loginHandle(userName, password).subscribe(
        (response) => {
          if(response.roles[0] === 'ROLE_STUDENT') {
              this.message.create('error', `Tài khoản của bạn không thuộc phạm vi teacher, hãy đăng ký tài khoản để cùng làm giáo viên với chúng tôi`)
          }
          else{
            localStorage.setItem('token', response.token);
            this.message.create('success', `Đã đăng nhập thành công`);
            this.route.navigate(['']);
          }
        },
        (error) => {
          console.log(error);
          this.message.create('error', `Tài khoản hoặc mật khẩu của bạn không đúng`);
          this.validateForm.reset();
          this.resetFocus();
        }
      );
    }
  }
}
