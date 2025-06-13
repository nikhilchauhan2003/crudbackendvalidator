import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  userHobbies: any[] = [];

  constructor(private auth: Auth, private router: Router) {} // ✅ Inject Router here

  ngOnInit() {
    this.auth.getUsersWithHobbies().subscribe({
      next: (res) => {
        this.userHobbies = res.data || res || [];
        console.log('User hobbies:', this.userHobbies);
      },
      error: (err) => {
        console.error('Failed to load user hobbies:', err);
      }
    });
  }

  editUser(item: any) {
    this.router.navigate(['/update-user'], {
      state: {
        user: {
          name: item.user_name,
          email: item.user_email,
          hobby: item.hobby
        }
      }
    });
  }
}
