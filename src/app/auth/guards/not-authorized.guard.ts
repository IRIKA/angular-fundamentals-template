import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {

    // Add your code here
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.authService.isAuthorized$.pipe(
            map(isAuthorized => isAuthorized ? this.router.parseUrl('/courses') : true)
        );
    }
}
