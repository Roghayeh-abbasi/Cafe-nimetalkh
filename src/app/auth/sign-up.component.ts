// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../core/auth.service';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-sign-up',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent {
//   username: string = '';
//   password: string = '';
//   error: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   signUp(): void {
//     if (!this.username || !this.password) {
//       this.error = 'لطفاً همه فیلدها را پر کنید';
//       return;
//     }
//     const success = this.authService.signUp(this.username, this.password);
//     if (success) {
//       this.router.navigate(['/auth/login']);
//     } else {
//       this.error = 'این شماره موبایل قبلاً ثبت شده است';
//     }
//   }
// }






import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  signUp(): void {
  if (!this.username || !this.password) {
    this.error = 'لطفاً همه فیلدها را پر کنید';
    return;
  }

  // 👇 نقش پیش‌فرض کاربر جدید user هست، می‌تونی از فرم هم بگیری
  const success = this.authService.signUp(this.username, this.password, 'user');

  if (success) {
    this.router.navigate(['/auth/login']);
  } else {
    this.error = 'این شماره موبایل قبلاً ثبت شده است';
  }
}
}
