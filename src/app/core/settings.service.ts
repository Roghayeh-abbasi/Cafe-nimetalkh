// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SettingsService {
//   private apiUrl = 'https://your-api-url/api/settings'; // جایگزین با URL واقعی API

//   constructor(private http: HttpClient) {}

//   getSettings(): Observable<any> {
//     // برای تست موقت با localStorage
//     const settings = JSON.parse(localStorage.getItem('settings') || '{}');
//     return of(settings);
//     // برای استفاده از API واقعی:
//     // return this.http.get(this.apiUrl);
//   }

//   updateSettings(settings: any): Observable<any> {
//     // برای تست موقت با localStorage
//     const currentSettings = JSON.parse(localStorage.getItem('settings') || '{}');
//     const updatedSettings = { ...currentSettings, ...settings };
//     localStorage.setItem('settings', JSON.stringify(updatedSettings));
//     return of({ success: true });
//     // برای استفاده از API واقعی:
//     // return this.http.put(this.apiUrl, settings);
//   }
// }


import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // داده‌های پیش‌فرض
  private defaultSettings = {
    general: {
      cafeName: 'کافه من',
      email: 'info@mycafe.com',
      phone: '09123456789',
      address: 'تهران، خیابان نمونه',
      workingHours: '8:00-22:00'
    },
    orders: {
      minOrderAmount: 50000,
      onlineOrdersEnabled: true,
      deliveryTimeSlots: '10:00-12:00, 14:00-16:00, 18:00-20:00',
      orderStatuses: 'در انتظار, در حال آماده‌سازی, ارسال شده',
      deliveryFee: 20000
    },
    products: {
      defaultCategory: 'coffee',
      showOutOfStock: false,
      defaultTaxRate: 9
    },
    users: {
      allowGuestOrders: true,
      emailNotifications: true,
      adminAccessLevel: 'full'
    },
    reports: {
      defaultReportRange: 'daily',
      exportFormat: 'pdf'
    },
    dashboard: {
      showUsersWidget: true,
      showOrdersWidget: true,
      showRevenueWidget: true,
      showMessagesWidget: true
    }
  };

  constructor() {}

  getSettings(): Observable<any> {
    // بررسی localStorage
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    // اگر localStorage خالی بود، از داده‌های پیش‌فرض استفاده کن
    if (Object.keys(settings).length === 0) {
      localStorage.setItem('settings', JSON.stringify(this.defaultSettings));
      return of(this.defaultSettings);
    }
    return of(settings);
  }

  updateSettings(settings: any): Observable<any> {
    // به‌روزرسانی localStorage
    const currentSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem('settings', JSON.stringify(updatedSettings));
    return of({ success: true });
  }
}