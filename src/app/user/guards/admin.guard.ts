import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private userStoreService: UserStoreService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        console.debug('AdminGuard canActivate called, isAdmin$: ', this.userStoreService.isAdmin$);
        if (this.userStoreService.isAdmin$ && typeof this.userStoreService.isAdmin$.pipe === 'function') {
            return this.userStoreService.isAdmin$.pipe(
                map(isAdmin => isAdmin ? true : this.router.parseUrl('/courses'))
            );
        } else {
            return of(this.router.createUrlTree(['/courses']));
        }
    }
}
