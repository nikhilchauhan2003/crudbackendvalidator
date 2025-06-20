import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App,appConfig).catch(err => console.error(err));
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(
//       withInterceptors([AuthInterceptor])
//     )
//   ]
// });