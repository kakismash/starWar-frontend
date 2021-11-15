import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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

  constructor(private readonly sessionS: SessionService,
              private router: Router) {

    this.routes.push({
      name: 'Home',
      icon: 'home',
      path: '/home'
    })

    this.routes.push({
      name: '3D Models',
      icon: '3d_rotation',
      path: '/threed'
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

  isNotHomeRoute(): boolean {
    return this.router.url.includes('film') ||
            this.router.url.includes('people') ||
            this.router.url.includes('planet')
  }

  getRoutes(): Array<any> {
    if (this.isDane()) {
      return this.routes.filter(r => r.name !== 'Films');
    } else if (this.isMatt()) {
      return this.routes.filter(r => r.name !== 'People')
    } else {
      return [];
    }
  }

  clearUser(drawer: MatDrawer): void {
    if (drawer.opened) {
      drawer.toggle();
    }
    this.user = '';
    this.sessionS.remove();
  }

  setOrChangeUser(): void {
    this.sessionS.save(this.user);
    if (this.isDane() &&  this.router.url.includes('film')) {
      this.router.navigate(['home']);
    } else if(this.isMatt() && this.router.url.includes('people')) {
      this.router.navigate(['home']);
    }
  }

  isDaneOrMatt(): boolean {
    return this.sessionS.currentUser === 'Dane' || this.sessionS.currentUser === 'Matt';
  }

  isDane(): boolean {
    return this.sessionS.currentUser === 'Dane';
  }

  isMatt(): boolean {
    return this.sessionS.currentUser === 'Matt';
  }
}
