import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Crawl } from '../model/crawl.model';
import { StarWarService } from '../service/star-war.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  crawls: Array<Crawl> = new Array<Crawl>();
  currentCrawl!: Crawl;
  ready: boolean = false;

  audio = new Audio();


  constructor(private starWarService: StarWarService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.audio.src = "../../../assets/star-wars-theme-song.mp3";
    this.audio.load();

    this.starWarService.getGeneral().subscribe(r => {
      this.crawls = r;
      this.currentCrawl = this.crawls[0];
      this.ready = true;
      this.playAudio();
    });

  }

  ngOnDestroy(): void {
    this.stopAudio();
  }

  setCrawl(crawl: Crawl): void {
    this.ready = false;
    this.stopAudio();
    this.cd.detectChanges();
    this.playAudio();
    this.currentCrawl = crawl;
    this.ready = true;
  }

  playAudio(): void {
    this.audio.play();
  }

  stopAudio(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
