import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // Angular ko batata hai ki ye class ek service hai, jo globally available hogi.
export class Auth {
  private http = inject(HttpClient); // Angular ka HttpClient use ho raha hai backend se request bhejne ke liye.
  
  private baseUrl = 'http://localhost:3333/api/auth'; // Base URL for all /api/auth endpoints.

  constructor() {}

  // Saare users ka data fetch karne ke liye
  getUserData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // User login karne ke liye
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // User signup karne ke liye
  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { name, email, password });
  }

getUsersWithHobbies(): Observable<any> {
  return this.http.get(`${this.baseUrl}/dashboard`);
}

updateUserDetails(data: { name: string; email: string; hobby: string }) {
  return this.http.put<any>(`${this.baseUrl}/users`, data); 
}



}
