import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmComponent } from './film/film.component';
import { AuthMattGuard } from './guard/auth-matt.guard';
import { AuthGuard } from './guard/auth.guard';
import { AuthGuardDane } from './guard/authDane.guard';
import { HomeComponent } from './home/home.component';
import { PeopleComponent } from './people/people.component';
import { PlanetComponent } from './planet/planet.component';
import { ThreeComponent } from './three/three.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'threed', component: ThreeComponent },
  { path: 'people', component: PeopleComponent, canActivate: [AuthGuardDane] },
  { path: 'film', component: FilmComponent, canActivate: [AuthMattGuard] },
  { path: 'planet', component: PlanetComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
