import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  isLogin = true;
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

  constructor(private fb: NonNullableFormBuilder) {}
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
}
