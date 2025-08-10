
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

interface Reservation {
  date: Date;
  table: string;
  status: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  loyaltyPoints: number;
  lastReservation?: Reservation;
}

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  isEditing = false;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePicture: '',
    loyaltyPoints: 0,
    lastReservation: undefined
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getLoggedInUser().subscribe(user => {
      if (user) {
        this.user = {
          firstName: user.username,
          lastName: '',
          email: `${user.username}@example.com`,
          phone: user.username,
          profilePicture: localStorage.getItem('profileImage') || '/assets/default-profile.jpg',
          loyaltyPoints: 150,
          lastReservation: {
            date: new Date('2025-07-19'),
            table: 'میز 5',
            status: 'تأیید شده'
          }
        };
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.editForm) {
      this.editForm.resetForm(this.user);
    }
  }

  saveProfile() {
    if (this.editForm.valid) {
      if (this.user.profilePicture) {
        localStorage.setItem('profileImage', this.user.profilePicture);
      }
      this.authService.updateUsername(this.user.firstName);
      console.log('پروفایل به‌روزرسانی شد:', this.user);
      this.isEditing = false;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}