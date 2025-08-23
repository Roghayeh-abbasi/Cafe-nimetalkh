import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  addToCart(product: Product): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // افزایش تعداد اگه محصول وجود داره
    } else {
      this.cart.push({ ...product, quantity: 1 }); // اضافه کردن محصول جدید با quantity 1
    }
  }

  getCart(): Product[] {
    return [...this.cart]; // کپی آرایه برای جلوگیری از تغییرات مستقیم
  }

  updateCart(newCart: Product[]): void {
    this.cart = [...newCart]; // جایگزینی سبد با آرایه جدید
  }

  clearCart(): void {
    this.cart = [];
  }

  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0); // مجموع quantityها
  }
}