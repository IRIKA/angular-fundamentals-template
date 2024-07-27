import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { RegistrationFormRoutingModule } from './registration-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrationFormComponent } from './registration-form.component';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationFormRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class RegistrationFormModule { }