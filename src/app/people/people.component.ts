import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { People } from '../model/people.model';
import { StarWarService } from '../service/star-war.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  panelOpenState = false;

  loading: boolean = true;
  people: People = new People();
  peoples: Array<People> = [];

  constructor(private starWarService: StarWarService) {
    this.getPeoples();
  }

  ngOnInit(): void {}

  private getPeoples(): void {
    this.starWarService
        .getWithPath('people')
        .subscribe(rpeoples => {
          this.peoples = new Array<People>();
          Object.assign(this.peoples, rpeoples);
          this.loading = false;
        });
  }

  getImage(path: string): string {
    return path;
  }

  getpeople(id: number): void {
    this.loading = true;
    this.starWarService
        .getWithPath( 'peoples/' + id )
        .subscribe(rpeople => {
          this.people = new People();
          Object.assign(this.people, rpeople);
          this.loading = false;
        });
  }

  getIcon(gender: string): string {
    if (gender === 'male') {
      return 'male'
    } else if (gender === 'female') {
      return 'female';
    } else {
      return 'smart_toy';
    }
  }
}
