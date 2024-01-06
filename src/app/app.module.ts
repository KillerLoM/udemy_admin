import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import {
  MenuFoldOutline,
  MenuUnfoldOutline
} from '@ant-design/icons-angular/icons';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InterceptorRequestService } from './Service/intercep/interceptor-request.service';
import { AddCoursesComponent } from './component/add-courses/add-courses.component';
import {MatStepperModule} from '@angular/material/stepper';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {MatTableModule} from '@angular/material/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { UserAccountComponent } from './component/user-account/user-account.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LessonsComponent } from './component/lessons/lessons.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ChildLessonsComponent } from './component/lessons/child-lessons/child-lessons.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    AddCoursesComponent,
    UserAccountComponent,
    LessonsComponent,
    ChildLessonsComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzIconModule,
    NzLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzEmptyModule,
    NzPaginationModule,
    NzSelectModule,
    NzResultModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzButtonModule,
    NzAlertModule,
    NzStepsModule,
    NzDividerModule,
    NzBreadCrumbModule,
    NzSkeletonModule,
    CommonModule,
    MatStepperModule,
    NzUploadModule,MatTableModule,
    NzModalModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  providers: [
    DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorRequestService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
 }
