import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentUser: string = '';

  constructor(private router: Router) {}

  save(name: string): void {
    if (name === 'Dane' || name === 'Matt') {
      this.currentUser = name;
    } else {
      this.currentUser = '';
      this.redirectToHome();
    }
  }

  remove(): void {
    this.currentUser = '';
    this.redirectToHome();
  }

  redirectToHome(): void {
    this.router.navigate(['home']);
  }
}
