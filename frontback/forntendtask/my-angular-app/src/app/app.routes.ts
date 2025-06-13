// import { Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth';
// import { Dashboard } from './dashboard/dashboard';

// export const routes: Routes = [
//   {
//     path: 'auth',
//     component: AuthComponent   // Directly use component here
//   },
//   {
//     path: 'dashboard',
//     component: Dashboard
//   },
  
//   {
//     path: '',
//     redirectTo: 'auth',
//     pathMatch: 'full'
//   }
  
   
// ];

import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
   { path: 'dashboard', component: Dashboard },
   {
  path: 'update-user',
  loadComponent: () => import('./updateuser/updateuser').then(m => m.Updateuser)
}

];

