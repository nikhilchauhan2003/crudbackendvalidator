// // 


// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";


// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor() { }
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const token = localStorage.getItem("token");
//         if (token) {
//             req = req.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//         }
//         return next.handle(req);


//     }

// }

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Added Authorization header:', req.headers.get('Authorization'));
    } else {
      console.log('No token found in localStorage');
    }

    return next.handle(req);
  }
}
