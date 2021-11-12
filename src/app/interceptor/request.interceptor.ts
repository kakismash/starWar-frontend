import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../service/session.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private readonly sessionService: SessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let req = request;

    if (request.url && request.url.includes('getMyStarWarsCollection/') && this.sessionService.currentUser !== '') {

      let clonedRequest = request.clone({ headers: request.headers.append('current-user', this.sessionService.currentUser) })

      req = request.clone(clonedRequest);

    }

    return next.handle(req);
  }
}
