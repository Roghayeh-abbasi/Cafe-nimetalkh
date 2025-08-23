import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, Product } from '../core/cart.service';

declare var L: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {
  cart: Product[] = [];
  totalPrice: number = 0;
  currentView: string = 'default';
  orderType: string = 'select';
  deliveryType: string = 'dine-in';
  deliveryAddress: string = '';
  addressNotes: string = '';
  map: any;
  marker: any;
  lat: number = 35.6892; // مختصات پیش‌فرض (تهران)
  lng: number = 51.3890;
  searchQuery: string = ''; // فیلد جدید برای جستجوی آدرس

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    console.log('سبد دریافت‌شده از سرویس:', this.cart);
    this.calculateTotal();
  }

  ngAfterViewInit(): void {
    if (this.orderType === 'online') {
      this.initMap();
    }
  }

  // افزایش تعداد محصول
  increaseQuantity(index: number): void {
    this.cart[index].quantity++;
    this.cartService.updateCart(this.cart); // به‌روزرسانی سرویس
    this.calculateTotal();
  }

  // کاهش تعداد محصول
  decreaseQuantity(index: number): void {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
    } else {
      this.removeFromCart(index);
    }
    this.cartService.updateCart(this.cart); // به‌روزرسانی سرویس
    this.calculateTotal();
  }

  // حذف محصول
  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.cartService.updateCart(this.cart); // به‌روزرسانی سرویس
    this.calculateTotal();
  }

  // محاسبه قیمت با احتساب تعداد
  getDiscountedPrice(product: Product): number {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100) * product.quantity;
    }
    return product.price * product.quantity;
  }

  calculateTotal(): void {
    this.totalPrice = this.cart.reduce((total, item) => total + this.getDiscountedPrice(item), 0);
  }

  goToCheckout(): void {
    if (this.cart.length === 0) {
      alert('سبد خرید خالی است!');
      return;
    }
    this.currentView = 'checkout';
  }

  selectOrderType(type: string): void {
    this.orderType = type;
    if (type === 'online') {
      setTimeout(() => this.initMap(), 100);
    } else {
      if (this.map && this.marker) this.map.removeLayer(this.marker);
    }
  }

  initMap(): void {
    if (typeof L !== 'undefined' && document.getElementById('map')) {
      this.map = L.map('map').setView([this.lat, this.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(this.map)
        .on('dragend', (e: any) => {
          const latlng = e.target.getLatLng();
          this.lat = latlng.lat;
          this.lng = latlng.lng;
          this.reverseGeocode(this.lat, this.lng);
        });

      this.map.on('click', (e: any) => {
        this.lat = e.latlng.lat;
        this.lng = e.latlng.lng;
        if (this.marker) this.map.removeLayer(this.marker);
        this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(this.map)
          .on('dragend', (e: any) => {
            const latlng = e.target.getLatLng();
            this.lat = latlng.lat;
            this.lng = latlng.lng;
            this.reverseGeocode(this.lat, this.lng);
          });
        this.reverseGeocode(this.lat, this.lng);
      });
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          if (this.map && this.marker) {
            this.map.setView([this.lat, this.lng], 15);
            this.map.removeLayer(this.marker);
            this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(this.map)
              .on('dragend', (e: any) => {
                const latlng = e.target.getLatLng();
                this.lat = latlng.lat;
                this.lng = latlng.lng;
                this.reverseGeocode(this.lat, this.lng);
              });
            this.reverseGeocode(this.lat, this.lng);
          }
        },
        (error) => {
          alert('لطفاً دسترسی به موقعیت مکانی را فعال کنید.');
        }
      );
    } else {
      alert('مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.');
    }
  }

  reverseGeocode(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.display_name) {
          this.deliveryAddress = data.display_name;
        } else {
          this.deliveryAddress = 'آدرس یافت نشد.';
        }
      })
      .catch(() => {
        this.deliveryAddress = 'خطا در دریافت آدرس.';
      });
  }

  searchAddress(): void {
    if (!this.searchQuery.trim()) {
      alert('لطفاً آدرس را وارد کنید.');
      return;
    }
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}&addressdetails=1&limit=1`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          this.lat = parseFloat(data[0].lat);
          this.lng = parseFloat(data[0].lon);
          if (this.map && this.marker) {
            this.map.setView([this.lat, this.lng], 15);
            this.map.removeLayer(this.marker);
            this.marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(this.map)
              .on('dragend', (e: any) => {
                const latlng = e.target.getLatLng();
                this.lat = latlng.lat;
                this.lng = latlng.lng;
                this.reverseGeocode(this.lat, this.lng);
              });
            this.reverseGeocode(this.lat, this.lng);
          }
        } else {
          alert('آدرسی پیدا نشد.');
        }
      })
      .catch(() => {
        alert('خطا در جستجوی آدرس.');
      });
  }

  submitOrder(): void {
    if (this.orderType === 'online' && !this.deliveryAddress.trim()) {
      alert('لطفاً آدرس تحویل را انتخاب کنید.');
      return;
    }
    if (this.orderType === 'in-person' && !this.deliveryType) {
      alert('لطفاً نوع تحویل را انتخاب کنید.');
      return;
    }
    let orderDetails = `سفارش شما ثبت شد!\nنوع سفارش: ${this.orderType === 'online' ? 'آنلاین' : 'حضوری'}`;
    if (this.orderType === 'online') {
      orderDetails += `\nآدرس: ${this.deliveryAddress} (${this.addressNotes})`;
    } else {
      orderDetails += `\nنوع تحویل: ${this.deliveryType === 'dine-in' ? 'داخل سالن' : 'بیرون‌بر'}`;
    }
    alert(orderDetails);
    this.cartService.clearCart();
    this.currentView = 'default';
    this.orderType = 'select';
    this.deliveryType = 'dine-in';
    this.deliveryAddress = '';
    this.addressNotes = '';
    this.searchQuery = ''; // ریست کردن جستجو
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
    }
  }

  goBack(): void {
    this.currentView = 'default';
    this.orderType = 'select';
    this.deliveryType = 'dine-in';
    this.deliveryAddress = '';
    this.addressNotes = '';
    this.searchQuery = ''; // ریست کردن جستجو
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
    }
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }
}