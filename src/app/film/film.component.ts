import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Film } from '../model/film.model';
import { StarWarService } from '../service/star-war.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  panelOpenState = false;

  loading: boolean = true;
  film: Film = new Film();
  films: Array<Film> = [];

  constructor(private starWarService: StarWarService) {
    this.getFilms();
  }

  ngOnInit(): void {}

  private getFilms(): void {
    this.starWarService
        .getWithPath('films')
        .subscribe(rfilms => {
          this.films = new Array<Film>();
          Object.assign(this.films, rfilms);
          this.loading = false;
        });
  }

  getImage(path: string): string {
    return path;
  }

  getfilm(id: number): void {
    this.loading = true;
    this.starWarService
        .getWithPath( 'films/' + id )
        .subscribe(rfilm => {
          this.film = new Film();
          Object.assign(this.film, rfilm);
          this.loading = false;
        });
  }

}
