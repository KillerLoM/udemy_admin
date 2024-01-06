import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    title: "FEDUCATION",
  },
  {
    path:'sign-up',
    component: SignUpComponent,
    title: "FEDUCATION", 
  },
  {
    path:'',
    component: DashboardComponent,
    title: "FEDUCATION",
  },
  {
    path:'forget-password',
    component: ForgetPasswordComponent,
    title: "FEDUCATION",
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
