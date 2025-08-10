// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../core/auth.service';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   error: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   login(): void {
//     if (!this.username || !this.password) {
//       this.error = 'لطفاً همه فیلدها را پر کنید';
//       return;
//     }
//     this.authService.login(this.username, this.password, '/').subscribe(success => {
//       if (success) {
//         this.router.navigate(['/']);
//       } else {
//         this.error = 'شماره موبایل یا رمز عبور اشتباه است';
//       }
//     });
//   }
// }





import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}
login(): void {
  if (!this.username || !this.password) {
    this.error = 'لطفاً همه فیلدها را پر کنید';
    return;
  }

  this.authService.login(this.username, this.password).subscribe(success => {
    if (success) {
      const user = this.authService.getCurrentUserSync(); // ✅ امن‌تر و دقیق‌تر
      if (user?.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.error = 'شماره موبایل یا رمز عبور اشتباه است';
    }
  });
}


}