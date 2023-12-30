import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { ShareService } from 'src/app/Service/share.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
    user: User| null = null;
    idUser: number | null = null
    myForm: FormGroup;
    constructor(
      @Inject(ShareService) private shareService: ShareService,
      private fb: FormBuilder,
      private _formBuilder: FormBuilder
    ){
      this.user = this.shareService.getUser();
      console.log(this.user?.userDTO.fullname);
      if(this.user?.userDTO.id)
      this.idUser = this.user?.userDTO.id;
      this.myForm = this.fb.group({
        telephoneControl: new FormControl('555-555-1234')
      });
    }
    userFormGroup = this._formBuilder.group({
      idUser: ['', Validators.required],
      fullname: ['', Validators.required],
    });
}
