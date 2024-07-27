import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public name$: Observable<string> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) { }

    getUser() {
        // Add your code here
        this.userService.getUser().subscribe({
            next: user => {
                console.debug(user);
                console.debug(`name is ${user.result.name}`);
                console.debug(`isAdmin is ${user.result.role}`);
                this.name$$.next(user.result.name);
                this.isAdmin$$.next(user.result.role == 'admin');
                console.debug('isAdmin$$ value:', this.isAdmin$$.getValue());
            },
            error: error => {
                console.error('Error fetching user:', error);
            }
        });
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }

    set name(name: string) {
        this.name$$.next(name);
    }
}
