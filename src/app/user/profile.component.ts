

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isSidebarOpen = false;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // توی دسکتاپ، سایدبار همیشه باز باشه
    if (window.innerWidth > 768) {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    // فقط توی موبایل سایدبار رو جمع کن
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }
  
  goBack() {
   this.router.navigate(['/']);
 }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}