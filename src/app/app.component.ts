import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  userName = 'Iryna Shyrshova';
  isLoggedIn = false;
  isCourses = true;
  infoTitle = 'Your list is empty';
  infoText = 'Please use "Add New Course" button to add  your first course';

  login() {
    console.debug('login not implemented');
  }

  logout() {
    console.debug('logout not implemented');
  }

  addNewCourse() {
    console.debug('addNewCourse not implemented');
  }
}
