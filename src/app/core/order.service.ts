import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = [
    {
      id: 'ORD12345',
      date: '1403/03/21',
      orderTime: '14:30',
      status: 'تحویل شده',
      total: 780000,
      orderType: 'حضوری',
      tableNumber: '5',
      customerNote: 'لطفاً سریع آماده کنید.',
      deliveryAddress: null,
      deliveryStatus: null,
      showDetails: false,
      items: [
        { name: 'اسپرسو', quantity: 2, price: 120000, customizations: 'دوبل شات' },
        { name: 'کیک شکلاتی', quantity: 1, price: 540000, customizations: 'بدون شکر' }
      ]
    },
    {
      id: 'ORD12346',
      date: '1403/04/01',
      orderTime: '18:45',
      status: 'لغو شده',
      total: 430000,
      orderType: 'ارسال',
      tableNumber: null,
      customerNote: 'لطفاً با بسته‌بندی مناسب ارسال کنید.',
      deliveryAddress: 'تهران، خیابان ولیعصر، کوچه 12، پلاک 34',
      deliveryStatus: 'لغو شده توسط مشتری',
      showDetails: false,
      items: [
        { name: 'لاته', quantity: 1, price: 150000, customizations: 'شیر سویا' },
        { name: 'ساندویچ مرغ', quantity: 1, price: 280000, customizations: 'بدون سس' }
      ]
    },
    {
      id: 'ORD12347',
      date: '1403/04/10',
      orderTime: '09:15',
      status: 'در انتظار',
      total: 670000,
      orderType: 'حضوری',
      tableNumber: '3',
      customerNote: null,
      deliveryAddress: null,
      deliveryStatus: null,
      showDetails: false,
      items: [
        { name: 'پاستا آلفردو', quantity: 1, price: 670000, customizations: 'با قارچ اضافی' }
      ]
    }
  ];

  constructor() {}

  getOrders(): Observable<any[]> {
    return of(this.orders);
  }

  getPendingOrdersCount(): Observable<number> {
    return of(this.orders.filter(order => order.status === 'در انتظار').length);
  }

  addOrder(order: any): Observable<any> {
    this.orders.push(order);
    return of(order);
  }

  updateOrder(orderId: string, updatedOrder: any): Observable<any> {
    const index = this.orders.findIndex(order => order.id === orderId);
    if (index !== -1) {
      this.orders[index] = { ...this.orders[index], ...updatedOrder };
      return of(this.orders[index]);
    }
    return of(null);
  }
}