import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  @Output() loginSelected = new EventEmitter<boolean>();

  // Use the names `name`, `email`, `password` for the form controls.
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(6)]],
      'email': ['', [Validators.required, EmailValidatorDirective.validate]],
      'password': ['', Validators.required]
    });
  }

  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }

  onSubmit() {
    console.debug('Start submitting...');
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      console.debug('Form Submitted!');
    } else {
      console.debug('There are errors');
    }
  }

  onLoginSelected() {
    this.loginSelected.emit(true);
  }
}
