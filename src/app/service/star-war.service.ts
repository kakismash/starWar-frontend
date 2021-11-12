import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class StarWarService {

  url: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  getGeneral(): Observable<any> {
    return this.http.get<any>(this.url + 'getMyStarWarsCollection/');
  }

  getWithPath(path: string): Observable<any> {
    return this.http.get<any>(this.url + 'getMyStarWarsCollection/' + path, )
  }

  getImage(path: string): Observable<any> {
    return this.http.get<any>(this.url + path);
  }

}
