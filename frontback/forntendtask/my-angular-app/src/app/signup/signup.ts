import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { Auth } from '../services/auth';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'] 
})
export class Signup {
  name = '';
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  onSignup() {
    this.auth.signup(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Signup failed:', err),
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
