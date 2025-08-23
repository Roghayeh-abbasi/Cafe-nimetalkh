import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../core/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  generalForm: FormGroup;
  ordersForm: FormGroup;
  productsForm: FormGroup;
  usersForm: FormGroup;
  reportsForm: FormGroup;
  dashboardForm: FormGroup;
  activeSection: string | null = 'general';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private router: Router
  ) {
    // فرم تنظیمات عمومی
    this.generalForm = this.fb.group({
      cafeName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10,11}$')]],
      address: [''],
      workingHours: ['', Validators.required] // اضافه کردن ساعات کاری
    });

    // فرم تنظیمات سفارشات
    this.ordersForm = this.fb.group({
      minOrderAmount: [0, [Validators.required, Validators.min(0)]],
      onlineOrdersEnabled: [false],
      deliveryTimeSlots: [''],
      orderStatuses: [''],
      deliveryFee: [0, [Validators.min(0)]] // اضافه کردن هزینه ارسال
    });

    // فرم تنظیمات محصولات
    this.productsForm = this.fb.group({
      defaultCategory: ['', Validators.required],
      showOutOfStock: [false],
      defaultTaxRate: [0, [Validators.min(0)]] // اضافه کردن نرخ مالیات پیش‌فرض
    });

    // فرم تنظیمات کاربران
    this.usersForm = this.fb.group({
      allowGuestOrders: [false],
      emailNotifications: [false],
      adminAccessLevel: ['full', Validators.required] // سطح دسترسی ادمین
    });

    // فرم تنظیمات گزارشات
    this.reportsForm = this.fb.group({
      defaultReportRange: ['daily', Validators.required],
      exportFormat: ['pdf', Validators.required]
    });

    // فرم تنظیمات داشبورد
    this.dashboardForm = this.fb.group({
      showUsersWidget: [true],
      showOrdersWidget: [true],
      showRevenueWidget: [true],
      showMessagesWidget: [true]
    });
  }

  ngOnInit() {
    // بارگذاری تنظیمات از سرویس
    this.settingsService.getSettings().subscribe({
      next: (data) => {
        this.generalForm.patchValue(data.general || {});
        this.ordersForm.patchValue(data.orders || {});
        this.productsForm.patchValue(data.products || {});
        this.usersForm.patchValue(data.users || {});
        this.reportsForm.patchValue(data.reports || {});
        this.dashboardForm.patchValue(data.dashboard || {});
      },
      error: () => {
        this.errorMessage = 'خطا در بارگذاری تنظیمات';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    });
  }

  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  saveSettings(form: FormGroup, section: string) {
    if (form.valid) {
      this.settingsService.updateSettings({ [section]: form.value }).subscribe({
        next: () => {
          this.successMessage = 'تنظیمات با موفقیت ذخیره شد';
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: () => {
          this.errorMessage = 'خطا در ذخیره تنظیمات';
          setTimeout(() => this.errorMessage = null, 3000);
        }
      });
    } else {
      this.errorMessage = 'لطفاً تمام فیلدهای اجباری را پر کنید';
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
  }
}