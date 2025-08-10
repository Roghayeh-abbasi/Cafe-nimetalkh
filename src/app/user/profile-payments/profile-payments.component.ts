import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-payments.component.html',
  styleUrls: ['./profile-payments.component.css']
})
export class ProfilePaymentsComponent implements OnInit {
  newPayment = { amount: 0, date: '', method: '' };
  payments: any[] = [];

  ngOnInit() {
    const savedPayments = localStorage.getItem('payments');
    if (savedPayments) {
      this.payments = JSON.parse(savedPayments);
    }
  }

  addPayment() {
    if (this.newPayment.amount && this.newPayment.date && this.newPayment.method) {
      this.payments.push({ ...this.newPayment });
      localStorage.setItem('payments', JSON.stringify(this.payments));
      this.newPayment = { amount: 0, date: '', method: '' };
    } else {
      alert('لطفاً تمام فیلدها را پر کنید.');
    }
  }

  removePayment(index: number) {
    this.payments.splice(index, 1);
    localStorage.setItem('payments', JSON.stringify(this.payments));
  }
}