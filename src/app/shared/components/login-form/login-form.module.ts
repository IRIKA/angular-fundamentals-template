import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormRoutingModule } from './login-form-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { LoginFormComponent } from './login-form.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    LoginFormRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class LoginFormModule { }
