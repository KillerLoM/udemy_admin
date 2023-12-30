import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './Service/apiService/auth-service.service';
import { User } from './Model/user';
import { GenericResponse } from './Response/generic-response';
import { ShareService } from './Service/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'udemy_admin';

  constructor(
    @Inject(Router) private route: Router,
    @Inject(AuthServiceService) private authService: AuthServiceService,
    private shareService: ShareService
  ){
  }

}
