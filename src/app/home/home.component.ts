import { Component, OnInit } from '@angular/core';
import { StarWarService } from '../service/star-war.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  article: string = '';

  constructor(private starWarService: StarWarService) { }

  ngOnInit(): void {

    this.starWarService.getGeneral().subscribe(r => {
      this.article = r;
    });

  }



}
