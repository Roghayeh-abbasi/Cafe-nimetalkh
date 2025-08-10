import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './a-products.component.html',
  styleUrls: ['./a-products.component.css']
})
export class AdminProductsComponent {
  newProduct = { name: '', price: 0, discount: 0, category: '' };
  products = [
    { name: 'قهوه', price: 50, discount: 0, category: 'نوشیدنی' },
    { name: 'آبمیوه', price: 30, discount: 0, category: 'نوشیدنی' }
  ];
  editingIndex: number | null = null;
  editedProduct = { name: '', price: 0, discount: 0, category: '' };
  showSuccess = false;
  searchTerm = '';

  constructor() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) this.products = JSON.parse(savedProducts);
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.price >= 0) {
      this.products.push({ ...this.newProduct });
      this.saveProducts();
      this.newProduct = { name: '', price: 0, discount: 0, category: '' };
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 2000); // پیام موفقیت برای 2 ثانیه
    }
  }

  editProduct(index: number) {
    this.editingIndex = index;
    this.editedProduct = { ...this.products[index] };
  }

  saveEdit() {
    if (this.editingIndex !== null && this.editedProduct.name && this.editedProduct.price >= 0) {
      this.products[this.editingIndex] = { ...this.editedProduct };
      this.saveProducts();
      this.editingIndex = null;
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 2000); // پیام موفقیت برای 2 ثانیه
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.saveProducts();
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 2000); // پیام موفقیت برای 2 ثانیه
  }

  filterProducts() {
    if (!this.searchTerm) return this.products;
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}