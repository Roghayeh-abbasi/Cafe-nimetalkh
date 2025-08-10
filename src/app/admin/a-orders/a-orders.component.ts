import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Order {
  orderId: string;
  customerName: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-a-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './a-orders.component.html',
  styleUrls: ['./a-orders.component.css'],
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
export class AOrdersComponent implements OnInit {
  orders: Order[] = [
    { orderId: '001', customerName: 'علی احمدی', amount: 150000, date: '2025-08-01' },
    { orderId: '002', customerName: 'محمد رضایی', amount: 80000, date: '2025-08-02' }
  ];
  filteredOrders: Order[] = [];
  editingIndex: number | null = null;
  editedOrder: Order = { orderId: '', customerName: '', amount: 0, date: '' };
  searchTerm: string = '';
  editError: boolean = false;
  editErrorMessage: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  sortField: keyof Order | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
    this.filterOrders();
  }

  validateEdit() {
    if (!this.editedOrder.orderId) {
      this.editError = true;
      this.editErrorMessage = 'شناسه سفارش را وارد کنید.';
    } else if (
      this.orders.some((o, i) => o.orderId === this.editedOrder.orderId && i !== this.editingIndex)
    ) {
      this.editError = true;
      this.editErrorMessage = 'این شناسه سفارش قبلاً استفاده شده است.';
    } else if (!this.editedOrder.customerName) {
      this.editError = true;
      this.editErrorMessage = 'نام مشتری را وارد کنید.';
    } else if (this.editedOrder.amount < 0) {
      this.editError = true;
      this.editErrorMessage = 'مبلغ نمی‌تواند منفی باشد.';
    } else if (!this.editedOrder.date) {
      this.editError = true;
      this.editErrorMessage = 'تاریخ را وارد کنید.';
    } else {
      this.editError = false;
      this.editErrorMessage = '';
    }
  }

  editOrder(index: number) {
    this.editingIndex = index;
    this.editedOrder = { ...this.orders[index] };
    this.validateEdit();
  }

  saveEdit() {
    if (this.editingIndex !== null) {
      this.validateEdit();
      if (this.editError) {
        this.showAlertMessage('error', this.editErrorMessage);
        return;
      }
      this.orders[this.editingIndex] = { ...this.editedOrder };
      this.saveOrders();
      this.editingIndex = null;
      this.filterOrders();
      this.showAlertMessage('success', 'سفارش با موفقیت ویرایش شد!');
    }
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editError = false;
    this.editErrorMessage = '';
  }

  deleteOrder(index: number) {
    if (confirm(`آیا مطمئن هستید که می‌خواهید سفارش ${this.filteredOrders[index].orderId} را حذف کنید؟`)) {
      this.orders.splice(this.orders.findIndex(o => o.orderId === this.filteredOrders[index].orderId), 1);
      this.saveOrders();
      this.filterOrders();
      this.showAlertMessage('success', 'سفارش با موفقیت حذف شد!');
    }
  }

  clearAllOrders() {
    if (confirm('آیا مطمئن هستید که می‌خواهید همه سفارشات را حذف کنید؟')) {
      this.orders = [];
      this.saveOrders();
      this.filterOrders();
      this.showAlertMessage('success', 'همه سفارشات با موفقیت حذف شدند!');
    }
  }

  sortOrders(field: keyof Order) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.filteredOrders.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      if (field === 'date') {
        return this.sortDirection === 'asc'
          ? new Date(valueA).getTime() - new Date(valueB).getTime()
          : new Date(valueB).getTime() - new Date(valueA).getTime();
      }
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return this.sortDirection === 'asc'
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
  }

  filterOrders() {
    if (!this.searchTerm) {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(o =>
        o.orderId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.sortField) {
      this.sortOrders(this.sortField);
    }
  }

  showAlertMessage(type: 'success' | 'error', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  private saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
}