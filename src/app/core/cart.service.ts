
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  getCart(): Product[] {
    return [...this.cart]; // کپی آرایه برای جلوگیری از تغییرات مستقیم
  }

  clearCart(): void {
    this.cart = [];
  }

  getTotalItems(): number {
    return this.cart.length;
  }
}