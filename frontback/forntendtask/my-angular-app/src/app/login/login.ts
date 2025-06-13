import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';  // Optional: For displaying errors in the template

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
      },
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
