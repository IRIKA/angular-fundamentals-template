import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  userName = 'Iryna Shyrshova';
  isLoggedIn = false;
  isCourses = true;
  infoTitle = 'Your list is empty';
  infoText = 'Please use "Add New Course" button to add  your first course';
  isRegistrationSelected: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.router.navigate([isLoggedIn ? '/courses' : '/login']);
      }
    );
  }

  login() {
    console.debug('logining');
    this.router.navigate(['/login']);
  }

  onRegistrationSelected(event: any) {
    this.isRegistrationSelected = event;
    this.router.navigate(['/registration']);
  }

  onLoginSelected(event: any) {
    this.isRegistrationSelected = !event;
  }

  logout() {
    console.debug('logouting');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addNewCourse() {
    console.debug('addNewCourse not implemented');
  }

  onSearch(value: string) {
    console.debug('onSearch not implemented with value:', value);
  }
}
