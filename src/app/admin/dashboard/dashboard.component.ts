import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, // یا حذف کامل standalone
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  usersCount = 150;
  ordersToday = 25;
  revenueToday = 500000;
  revenueMonth = 12500000;
  newMessages = 8;
  recentActivities = [
    { user: 'علی احمدی', action: 'سفارش جدید ثبت کرد', time: new Date('2025-08-16T10:00:00') },
    { user: 'ادمین', action: 'محصول جدید افزود', time: new Date('2025-08-16T09:30:00') },
    { user: 'محمد رضایی', action: 'پروفایل را ویرایش کرد', time: new Date('2025-08-16T08:45:00') }
  ];

  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // بارگذاری داده‌ها از API یا localStorage در صورت نیاز
  }

  ngAfterViewInit() {
    this.initCharts();
  }

  initCharts() {
    new Chart(document.getElementById('salesChart') as HTMLCanvasElement, {
      type: 'line',
      data: {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
        datasets: [{
          label: 'فروش (تومان)',
          data: [1000000, 1500000, 1200000, 1800000, 2000000],
          borderColor: '#A58C61',
          backgroundColor: 'rgba(165, 140, 97, 0.2)',
          fill: true
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });

    new Chart(document.getElementById('visitsChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
        datasets: [{
          label: 'بازدیدها',
          data: [500, 700, 600, 900, 1100],
          backgroundColor: '#A58C61'
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });

    new Chart(document.getElementById('signupsChart') as HTMLCanvasElement, {
      type: 'line',
      data: {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
        datasets: [{
          label: 'ثبت‌نام‌ها',
          data: [20, 30, 25, 40, 50],
          borderColor: '#A58C61',
          backgroundColor: 'rgba(165, 140, 97, 0.2)',
          fill: true
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });
  }

  addProduct() {
    this.router.navigate(['/admin/products']);
  }

  createReport() {
    this.router.navigate(['/admin/reports']);
  }

  sendMessage() {
    alert('ارسال پیام به کاربران');
  }
}