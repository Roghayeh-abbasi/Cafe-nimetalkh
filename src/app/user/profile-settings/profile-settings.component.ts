import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  activeTab: string = 'password';
  password = { current: '', new: '', confirm: '' };
  errors = { current: '', new: '', confirm: '' };
  notifications = { email: true, sms: false, push: false };
  preferences = { dietary: '', allergens: '' };
  display = { theme: 'light' };
  isSubmitting = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  passwordStrength = '';
  passwordStrengthText = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Load settings from LocalStorage
    const savedNotifications = localStorage.getItem('notifications');
    const savedPreferences = localStorage.getItem('preferences');
    const savedDisplay = localStorage.getItem('display');
    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
    }
    if (savedPreferences) {
      this.preferences = JSON.parse(savedPreferences);
    }
    if (savedDisplay) {
      this.display = JSON.parse(savedDisplay);
      this.applyTheme();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  togglePasswordVisibility(field: string) {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  checkPasswordStrength() {
    const password = this.password.new;
    if (!password) {
      this.passwordStrength = '';
      this.passwordStrengthText = '';
      return;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    if (length >= 12 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
      this.passwordStrength = 'strong';
      this.passwordStrengthText = 'قوی';
    } else if (length >= 8 && hasUpperCase && hasNumbers) {
      this.passwordStrength = 'medium';
      this.passwordStrengthText = 'متوسط';
    } else {
      this.passwordStrength = 'weak';
      this.passwordStrengthText = 'ضعیف';
    }
  }

  changePassword() {
    this.errors = { current: '', new: '', confirm: '' };
    this.isSubmitting = true;

    if (!this.password.current) {
      this.errors.current = 'لطفاً رمز فعلی را وارد کنید.';
      this.isSubmitting = false;
      return;
    }

    if (!this.password.new) {
      this.errors.new = 'لطفاً رمز جدید را وارد کنید.';
      this.isSubmitting = false;
      return;
    }

    if (this.password.new.length < 8) {
      this.errors.new = 'رمز جدید باید حداقل 8 کاراکتر باشد.';
      this.isSubmitting = false;
      return;
    }

    if (!/[A-Z]/.test(this.password.new)) {
      this.errors.new = 'رمز جدید باید شامل حداقل یک حرف بزرگ باشد.';
      this.isSubmitting = false;
      return;
    }

    if (!/[0-9]/.test(this.password.new)) {
      this.errors.new = 'رمز جدید باید شامل حداقل یک عدد باشد.';
      this.isSubmitting = false;
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password.new)) {
      this.errors.new = 'رمز جدید باید شامل حداقل یک کاراکتر خاص باشد.';
      this.isSubmitting = false;
      return;
    }

    if (this.password.new !== this.password.confirm) {
      this.errors.confirm = 'رمز جدید و تأیید آن مطابقت ندارند.';
      this.isSubmitting = false;
      return;
    }

    setTimeout(() => {
      alert('رمز با موفقیت تغییر کرد!');
      this.password = { current: '', new: '', confirm: '' };
      this.isSubmitting = false;
      this.passwordStrength = '';
      this.passwordStrengthText = '';
    }, 1000);
  }

  saveNotifications() {
    this.isSubmitting = true;
    setTimeout(() => {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
      alert('تنظیمات اعلان‌ها با موفقیت ذخیره شد!');
      this.isSubmitting = false;
    }, 1000);
  }

  savePreferences() {
    this.isSubmitting = true;
    setTimeout(() => {
      localStorage.setItem('preferences', JSON.stringify(this.preferences));
      alert('اولویت‌های غذایی با موفقیت ذخیره شد!');
      this.isSubmitting = false;
    }, 1000);
  }

  saveDisplaySettings() {
    this.isSubmitting = true;
    setTimeout(() => {
      localStorage.setItem('display', JSON.stringify(this.display));
      alert('تنظیمات نمایش با موفقیت ذخیره شد!');
      this.isSubmitting = false;
    }, 1000);
  }

  applyTheme() {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${this.display.theme}`);
  }
}