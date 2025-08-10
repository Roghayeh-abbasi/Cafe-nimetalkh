
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-profile-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css']
})
export class ProfileOrdersComponent implements OnInit {
  orders: any[] = [];
  deliveredOrders: any[] = [];
  pendingOrders: any[] = [];
  canceledOrders: any[] = [];
  showDelivered: boolean = true;
  showPending: boolean = true;
  showCanceled: boolean = true;

  constructor(private router: Router, private orderService: OrderService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.deliveredOrders = orders.filter(order => order.status === 'تحویل شده');
      this.pendingOrders = orders.filter(order => order.status === 'در انتظار');
      this.canceledOrders = orders.filter(order => order.status === 'لغو شده');
      console.log('Orders loaded:', this.orders);
      this.setupChart();
    });
  }

  setupChart() {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['تحویل شده', 'در انتظار', 'لغو شده'],
        datasets: [{
          data: [this.deliveredOrders.length, this.pendingOrders.length, this.canceledOrders.length],
          backgroundColor: ['#2f855a', '#d97706', '#c53030'],
          borderColor: ['#fef9c3', '#fef9c3', '#fef9c3'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: "'Vazir', Arial, sans-serif",
                size: 14
              },
              color: '#2e1606'
            }
          },
          title: {
            display: true,
            text: 'توزیع سفارش‌ها بر اساس وضعیت',
            font: {
              family: "'Vazir', Arial, sans-serif",
              size: 16
            },
            color: '#2e1606'
          }
        }
      }
    });
  }

  toggleDetails(order: any) {
    order.showDetails = !order.showDetails;
  }

  toggleSection(section: string) {
    if (section === 'delivered') {
      this.showDelivered = !this.showDelivered;
    } else if (section === 'pending') {
      this.showPending = !this.showPending;
    } else if (section === 'canceled') {
      this.showCanceled = !this.showCanceled;
    }
  }
  trackByOrder(index: number, order: any): string {
    return order.id;
  }
}





