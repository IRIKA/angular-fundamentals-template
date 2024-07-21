import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  email = '';
  password = '';
  formSubmitted = false;
  startedTyping: { [key: string]: boolean } = {};
  passwordModel = '';

  @ViewChild("loginForm") public loginForm!: NgForm;
  @Output() registrationSelected = new EventEmitter<boolean>();

  //Use the names `email` and `password` for form controls.
  onInput(fieldName: string) {
    this.startedTyping[fieldName] = true;
  }

  onSubmit(form: NgForm) {
    console.debug('Start submitting...');
    this.formSubmitted = true;
    if (form.valid) {
      console.debug('Form Submitted!', form.value);
    } else {
      console.debug('There are errors');
    }
  }

  onRegistrationSelected() {
    this.registrationSelected.emit(true);
  }
}