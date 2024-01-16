import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CoreService } from '../services/core.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private _core: CoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        let errorMessage = error.message;
        this._core.snackBar(errorMessage, 'Ok');

        this._core.goTo('home');
        return throwError(errorMessage);
      })
    );
  }
}
