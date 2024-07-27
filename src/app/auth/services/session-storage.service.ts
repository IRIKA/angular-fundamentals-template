import { Inject, Injectable, InjectionToken } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here
export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window
});

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(WINDOW) private window: Window) { }

  setToken(token: string): void {
    // Add your code here
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    // Add your code here
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    // Add your code here
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
