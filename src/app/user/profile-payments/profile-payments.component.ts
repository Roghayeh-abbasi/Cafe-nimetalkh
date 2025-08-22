import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import moment from 'jalali-moment';

interface Payment {
  paymentId: string;
  amount: number;
  date: string;
  method: string;
  status: 'موفق' | 'ناموفق' | 'در انتظار';
  description?: string;
  showDetails?: boolean;
}

@Component({
  selector: 'app-profile-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile-payments.component.html',
  styleUrls: ['./profile-payments.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ]),
    trigger('alertAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class ProfilePaymentsComponent implements OnInit {
  payments: Payment[] = [
    { paymentId: 'PAY001', amount: 50000, date: '2025-08-01', method: 'کارت بانکی', status: 'موفق', description: 'پرداخت برای سفارش غذا', showDetails: false },
    { paymentId: 'PAY002', amount: 30000, date: '2025-08-02', method: 'پرداخت آنلاین', status: 'در انتظار', description: 'پرداخت در انتظار تأیید', showDetails: false }
  ];
  filteredPayments: Payment[] = [];
  searchTerm: string = '';
  statusFilter: string = '';
  sortOption: string = 'date-desc';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  totalAmount: number = 0;
  paymentStatus: string = 'فعال';

  ngOnInit() {
    const savedPayments = localStorage.getItem('payments');
    if (savedPayments) {
      this.payments = JSON.parse(savedPayments);
      this.payments.forEach(p => {
        if (!moment(p.date, 'YYYY-MM-DD', true).isValid()) {
          console.warn(`Invalid date format for payment ${p.paymentId}: ${p.date}`);
          p.date = moment().format('YYYY-MM-DD');
        }
      });
    }
    this.calculateTotalAmount();
    this.updatePaymentStatus();
    this.filterPayments();
  }

  formatJalaliDate(date: string): string {
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
      return 'نامعتبر';
    }
    return moment(date, 'YYYY-MM-DD').locale('fa').format('D MMMM YYYY');
  }

  filterPayments() {
    let filtered = this.payments;
    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.paymentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.amount.toString().includes(this.searchTerm) ||
        p.method.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.formatJalaliDate(p.date).includes(this.searchTerm)
      );
    }
    if (this.statusFilter) {
      filtered = filtered.filter(p => p.status === this.statusFilter);
    }
    this.filteredPayments = [...filtered];
    this.calculateTotalAmount();
    this.updatePaymentStatus();
    this.sortPayments();
  }

  sortPayments() {
    this.filteredPayments.sort((a, b) => {
      if (this.sortOption === 'date-desc') {
        return moment(b.date).diff(moment(a.date));
      } else if (this.sortOption === 'date-asc') {
        return moment(a.date).diff(moment(b.date));
      } else if (this.sortOption === 'amount-desc') {
        return b.amount - a.amount;
      } else {
        return a.amount - b.amount;
      }
    });
  }

  calculateTotalAmount() {
    this.totalAmount = this.filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  }

  updatePaymentStatus() {
    if (this.totalAmount >= 100000) {
      this.paymentStatus = 'VIP';
    } else if (this.totalAmount >= 50000) {
      this.paymentStatus = 'طلایی';
    } else if (this.totalAmount > 0) {
      this.paymentStatus = 'فعال';
    } else {
      this.paymentStatus = 'غیرفعال';
    }
  }

  toggleDetails(index: number) {
    this.filteredPayments[index].showDetails = !this.filteredPayments[index].showDetails;
  }

  removePayment(index: number) {
    const paymentId = this.filteredPayments[index].paymentId;
    if (confirm(`آیا مطمئن هستید که می‌خواهید پرداخت ${paymentId} را حذف کنید؟`)) {
      this.payments = this.payments.filter(p => p.paymentId !== paymentId);
      this.savePayments();
      this.filterPayments();
      this.showAlertMessage('success', `پرداخت ${paymentId} با موفقیت حذف شد!`);
    }
  }

  clearAllPayments() {
    if (confirm('آیا مطمئن هستید که می‌خواهید همه پرداخت‌ها را حذف کنید؟')) {
      this.payments = [];
      this.savePayments();
      this.filterPayments();
      this.showAlertMessage('success', 'همه پرداخت‌ها با موفقیت حذف شدند!');
    }
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.sortOption = 'date-desc';
    this.filterPayments();
  }

  showAlertMessage(type: 'success' | 'error', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  private savePayments() {
    localStorage.setItem('payments', JSON.stringify(this.payments));
  }
}