import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    // Add your code here

    constructor(private authService: AuthService, private router: Router) { }

    canLoad(): Observable<boolean | UrlTree> {
        return this.authService.isAuthorized$.pipe(
            map(isAuthorized => isAuthorized ? true : this.router.parseUrl('/login'))
        );
    }
}
