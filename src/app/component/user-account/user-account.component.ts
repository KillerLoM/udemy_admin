import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { ShareService } from 'src/app/Service/share.service';
import { DatePipe } from '@angular/common';
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';
import { AuthServiceService } from 'src/app/Service/apiService/auth-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  user: User | null = null;
  idUser: number | null = null;
  nameInput: string | null = null;
  userForm!: FormGroup;
  currentDate: Date = new Date();
  differenceInDaysResult: number = 0;
  isVisible = false;
  isOkLoading = false;
  isLoadingOne = false;
  passwordVisible = false;
  password?: string;
  newpassword?: string;
  confirmpass?: string;
  differenceInHoursResult: number = 0;
  constructor(
    @Inject(ShareService) private shareService: ShareService,
    @Inject(AuthServiceService) private authService: AuthServiceService,
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.user = this.shareService.getUser();
    if (this.user?.userDTO.id)
      this.idUser = this.user?.userDTO.id;
    if (this.user?.userDTO) {
      let stringName = this.user?.userDTO.fullname.split('');
      let nameDisplay = stringName[0].concat(stringName[1]);
      for (let i = stringName.length - 1; i >= 0; i--) {
        if (stringName[i] == ' ') {
          nameDisplay = stringName[0].concat(stringName[i + 1]);
          break;
        }
      }
      this.nameInput = nameDisplay;
      console.log();
    }
  }
  handleUpdate(){
    const id = this.idUser;
    const fullname = this.userForm.value.nameFormControl;
    console.log(this.userForm.value.nameFormControl);
    const email = this.userForm.value.emailFormControl;
    const dateCreated = new Date(this.user?.userDTO.createdAt ?? new Date())
    if(id){
      this.authService.updateUser(id, fullname, email, dateCreated).subscribe((data:User) => {
        this.user = data;
        this.msg.success("Đã cập nhật thông tin tài khoản thành công");
        this.initValue();
        this.shareService.setUser(data);
      }) 
    }
    
  }
  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.handleUpdate();
      this.isLoadingOne = false;
    },  1000);
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      idUser: [this.idUser, Validators.required],
      fullname: [this.user?.userDTO.fullname, Validators.required],
      emailFormControl: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@gmail+\\.com")
      ]],
      nameFormControl: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]+$")
      ]],
      idFormControl: ['', [
        Validators.required,
      ]]
    });
    this.initValue();
  }

  initValue(): void {
    const dateObject = new Date(this.user?.userDTO.createdAt ?? new Date());
    this.differenceInDaysResult = differenceInDays(this.currentDate,dateObject);
    this.differenceInHoursResult = differenceInHours(this.currentDate,dateObject) -  (24*this.differenceInDaysResult);
    
    this.userForm.patchValue({
      emailFormControl: this.user?.userDTO.email,
      nameFormControl: this.user?.userDTO.fullname,
      idFormControl: this.user?.userDTO.id,
    });
  }
  formatDate(input: Date | undefined): string {
    const dateObject = new Date(input ?? new Date());
    return this.datePipe.transform(dateObject, 'dd-MM-yyyy') || '';
  }
  forrmatTime(input: Date| undefined): string {
    const dateObject = new Date(input ?? new Date());
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    return hours +" giờ " + minutes + " phút " + seconds + " giây";
  }
  handleChangePassword(){
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;

      if(this.password && this.newpassword && this.confirmpass){
        this.authService.changePassword(this.password, this.newpassword, this.confirmpass).subscribe((data: any) =>{
          this.msg.success("Đã đổi mật khẩu thành công");
          this.isVisible = false;
          this.isOkLoading = false;
          this.password = '';
          this.newpassword = '';
          this.confirmpass = '';
        })
      }
      else{
        this.msg.error("Đã có lỗi, vui lòng nhập đầy đủ vào các ô input như trên")
        this.isOkLoading = false;
      }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
