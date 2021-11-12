import { Component } from '@angular/core';
import { SessionService } from './service/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'starwar';

  user: string = '';
  routes: Array<any> = [];

  constructor(private readonly sessionS: SessionService) {

    this.routes.push({
      name: 'Home',
      icon: 'home',
      path: '/home'
    })

    this.routes.push({
      name: 'Films',
      icon: 'theaters',
      path: '/film'
    })

    this.routes.push({
      name: 'People',
      icon: 'people_alt',
      path: '/people'
    })

    this.routes.push({
      name: 'Planets',
      icon: 'public',
      path: '/planet'
    })

  }

  setOrChangeUser(): void {
    this.sessionS.save(this.user);
  }

  isDaneOrMatt(): boolean {
    return this.sessionS.currentUser === 'Dane' || this.sessionS.currentUser === 'Matt';
  }
}
