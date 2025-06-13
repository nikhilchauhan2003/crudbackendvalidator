import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { SocketService } from '../services/socketservices'; 

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './updateuser.html',
  styleUrls: ['./updateuser.css']
})
export class Updateuser {
  user = {
    name: '',
    email: '',
    hobby: ''
  };

  userLoaded = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private socketSvc: SocketService // 👈 Inject SocketService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state?.user) {
      this.user = state.user;
      this.userLoaded = true;
    }

    this.socketSvc.connect(); // 👈 Ensure socket is connected (optional if already done in Dashboard)
  }

  onSubmit() {
    this.auth.updateUserDetails(this.user).subscribe({
      next: res => {
        alert(res.message);

        // 👇 Emit hobbyUpdated event manually (optional: only if not done by backend)
        this.socketSvc.emit('hobbyUpdated', {
          name: this.user.name,
          email: this.user.email,
          hobby: this.user.hobby
        });

        this.router.navigate(['/dashboard']);
      },
      error: err => alert('Update failed: ' + err.error.message)
    });
  }
}
