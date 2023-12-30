import { Component, Inject } from '@angular/core';
import { User } from 'src/app/Model/user';
import { ShareService } from 'src/app/Service/share.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
    user: User| null = null;
    constructor(
      @Inject(ShareService) private shareService: ShareService,
    ){
      this.user = this.shareService.getUser();
      console.log(this.user?.userDTO.fullname)
    }

}
