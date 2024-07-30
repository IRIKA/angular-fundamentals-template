import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private userStoreService: UserStoreService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.userStoreService.isAdmin$.pipe(
            map(isAdmin => isAdmin ? true : this.router.parseUrl('/courses'))
        );
    }
}
