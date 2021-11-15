import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Model } from '../model/model.model';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

  panelOpenState = false;
  models: Array<Model> = new Array<Model>();

  constructor() {

    const stormTrooper = new Model();
    stormTrooper.name = 'Storm Trooper Dancing';
    stormTrooper.path = 'stormtrooper';
    stormTrooper.type = '.dae';

    this.models.push(stormTrooper);

    const SKYWALKER_LIGHTSABER_READY = new Model();
    SKYWALKER_LIGHTSABER_READY.name = 'SKYWALKER LIGHTSABER';
    SKYWALKER_LIGHTSABER_READY.path = 'SKYWALKER_LIGHTSABER_READY';
    SKYWALKER_LIGHTSABER_READY.type = '.glb';


    this.models.push(SKYWALKER_LIGHTSABER_READY);

    const lightSaber1 = new Model();
    lightSaber1.name = 'Light Saber Red';
    lightSaber1.path = 'Lightsaber1';
    lightSaber1.type = '.dae';

    this.models.push(lightSaber1);

    const mandalorian = new Model();
    mandalorian.name = 'Mandalorian Helmet';
    mandalorian.path = 'Mandalorian';
    mandalorian.type = '.fbx';

    this.models.push(mandalorian);

    const mf = new Model();
    mf.name = 'Millenium Falcon';
    mf.path = 'uploads_files_235499_millenium-falcon';
    mf.type = '.obj';

    this.models.push(mf);

   }

  ngOnInit(): void {
  }

}
