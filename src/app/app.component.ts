import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { UserStoreService } from './user/services/user-store.service';

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
  isRegistrationSelected: boolean = false;

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.router.navigate([isLoggedIn ? '/courses' : '/login']);
      }
    );
    this.userStoreService.getUser();
    this.userStoreService.name$.subscribe(name => {
      this.userName = name;
    });
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

  // addNewCourse() {
  //   console.debug('addNewCourse not implemented');
  // }  
}
