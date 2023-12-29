import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './Service/apiService/auth-service.service';
import { User } from './Model/user';

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
  ){
    this.validateUser();
  }
  validateUser(){
    this.authService.getInfoUser().subscribe((data: User) =>{
      this.route.navigate(['']);
    },
    Error => {
      this.route.navigate(['login']);
    })
  }
}
