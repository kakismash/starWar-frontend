import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Planet } from '../model/planet.model';
import { StarWarService } from './../service/star-war.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

  panelOpenState = false;

  loading: boolean = true;
  planet: Planet = new Planet();
  planets: Array<Planet> = [];

  constructor(private starWarService: StarWarService) {
    this.getPlanets();
  }

  ngOnInit(): void {}

  private getPlanets(): void {
    this.starWarService
        .getWithPath('planets')
        .subscribe(rPlanets => {
          this.planets = new Array<Planet>();
          Object.assign(this.planets, rPlanets);
          this.loading = false;
        });
  }

  getImage(path: string): string {
    return environment.apiURL + path;
  }

  getPlanet(id: number): void {
    this.loading = true;
    this.starWarService
        .getWithPath( 'planets/' + id )
        .subscribe(rPlanet => {
          this.planet = new Planet();
          Object.assign(this.planet, rPlanet);
          this.loading = false;
        });
  }

}
