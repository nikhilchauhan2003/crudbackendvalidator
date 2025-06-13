// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { TokenInterceptorService } from './auth-interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes), provideClientHydration(withEventReplay()),
    
//     provideHttpClient(withFetch()),
//     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
//   ]
// };
// import { ApplicationConfig } from '@angular/core';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptorService } from './services/auth-interceptor'; // Adjust path
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(withFetch()),
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: TokenInterceptorService,
//       multi: true
//     }
//   ]
// };
// 
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptorService } from './services/auth-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // ✅ added withFetch()
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
};
