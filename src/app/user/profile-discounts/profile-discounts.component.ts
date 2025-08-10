import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import moment from 'jalali-moment';

interface Discount {
  code: string;
  percentage: number;
  expiry: string;
  type: 'online' | 'first' | 'festival';
  description: string;
}

@Component({
  selector: 'app-profile-discounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-discounts.component.html',
  styleUrls: ['./profile-discounts.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class ProfileDiscountsComponent implements OnInit {
  newDiscountCode: string = '';
  userDiscounts: Discount[] = [];
  filteredDiscounts: Discount[] = [];
  availableDiscounts: Discount[] = [
    { code: 'ONLINE10', percentage: 10, expiry: '1404/06/30', type: 'online', description: 'ویژه سفارش‌های آنلاین بالای ۵۰۰,۰۰۰ تومان' },
    { code: 'FIRST20', percentage: 20, expiry: '1404/05/15', type: 'first', description: 'برای اولین خرید شما' },
    { code: 'FESTIVAL30', percentage: 30, expiry: '1404/12/30', type: 'festival', description: 'تخفیف جشنواره پاییزی' }
  ];
  codeError: boolean = false;
  codeErrorMessage: string = '';
  filterOption: string = 'all';

  ngOnInit() {
    const savedUserDiscounts = localStorage.getItem('userDiscounts');
    if (savedUserDiscounts) {
      this.userDiscounts = JSON.parse(savedUserDiscounts);
    }
    this.filterDiscounts();
  }

  validateCode() {
    if (!this.newDiscountCode) {
      this.codeError = true;
      this.codeErrorMessage = 'کد تخفیف را وارد کنید.';
    } else if (!this.availableDiscounts.some(d => d.code === this.newDiscountCode)) {
      this.codeError = true;
      this.codeErrorMessage = 'کد تخفیف نامعتبر است.';
    } else if (this.userDiscounts.some(d => d.code === this.newDiscountCode)) {
      this.codeError = true;
      this.codeErrorMessage = 'این کد تخفیف قبلاً استفاده شده است.';
    } else {
      this.codeError = false;
      this.codeErrorMessage = '';
    }
  }

  applyDiscount() {
    this.validateCode();

    if (this.codeError) {
      alert(this.codeErrorMessage);
      return;
    }

    const discount = this.availableDiscounts.find(d => d.code === this.newDiscountCode);
    if (discount && !this.isExpired(discount.expiry)) {
      this.userDiscounts.push({ ...discount });
      localStorage.setItem('userDiscounts', JSON.stringify(this.userDiscounts));
      this.newDiscountCode = '';
      this.codeError = false;
      this.codeErrorMessage = '';
      this.filterDiscounts();
      alert(`کد تخفیف ${discount.code} با موفقیت اعمال شد!`);
    } else {
      this.codeError = true;
      this.codeErrorMessage = 'این کد تخفیف منقضی شده است.';
      alert(this.codeErrorMessage);
    }
  }

  removeDiscount(index: number) {
    const code = this.filteredDiscounts[index].code;
    if (confirm(`آیا مطمئن هستید که می‌خواهید کد ${code} را حذف کنید؟`)) {
      this.userDiscounts.splice(this.userDiscounts.findIndex(d => d.code === code), 1);
      localStorage.setItem('userDiscounts', JSON.stringify(this.userDiscounts));
      this.filterDiscounts();
      alert('کد تخفیف با موفقیت حذف شد.');
    }
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      alert(`کد ${code} در کلیپ‌بورد کپی شد!`);
    }).catch(() => {
      alert('کپی کردن کد با مشکل مواجه شد.');
    });
  }

  filterDiscounts() {
    if (this.filterOption === 'active') {
      this.filteredDiscounts = this.userDiscounts.filter(d => !this.isExpired(d.expiry));
    } else if (this.filterOption === 'expired') {
      this.filteredDiscounts = this.userDiscounts.filter(d => this.isExpired(d.expiry));
    } else {
      this.filteredDiscounts = [...this.userDiscounts];
    }
  }

  formatJalaliDate(date: string): string {
    return moment(date, 'YYYY/MM/DD').locale('fa').format('D MMMM YYYY');
  }

  isExpired(date: string): boolean {
    return moment(date, 'YYYY/MM/DD').isBefore(moment());
  }

  getDiscountIcon(type: string): string {
    switch (type) {
      case 'online':
        return 'M3 3h18v2H3V3zm1 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm8 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z';
      case 'first':
        return 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z';
      case 'festival':
        return 'M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 16l-3-3 1.5-1.5L12 16l3-3-1.5-1.5L12 14l-1.5-1.5L9 14l3 3z';
      default:
        return 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 6h-4v2h4v2h-4v2h4v2H7v-2h4v-2H7v-2h4V9H7V7h10v2z';
    }
  }

  getProgressWidth(expiry: string): string {
    const now = moment();
    const expiryDate = moment(expiry, 'YYYY/MM/DD');
    const totalDays = expiryDate.diff(moment('1403/01/01', 'YYYY/MM/DD'), 'days');
    const daysLeft = expiryDate.diff(now, 'days');
    const percentage = this.isExpired(expiry) ? 0 : Math.max(0, (daysLeft / totalDays) * 100);
    return `${percentage}%`;
  }
}