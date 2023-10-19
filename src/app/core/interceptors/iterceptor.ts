// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Injectable, Injector } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, catchError } from 'rxjs';

// @Injectable()
// export class Interceptor implements HttpInterceptor {
//   constructor(
//     private inject: Injector,
//     private router: Router,
//     private _snackBar: MatSnackBar
//   ) {}

//   counter = 0;

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(catchError((x) => handleAuthError(x)));
//   }

//   private handleAuthError(err: HttpErrorResponse): Observable<any> {
//     if (err && err.status === 403 && this.counter != 1) {
//       this.counter++;

//     }
//   }
// }
