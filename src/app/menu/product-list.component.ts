import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryFilterPipe } from '../core/category-filter.pipe';
import { ProductService, Product } from '../core/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CategoryFilterPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  category: string | null = null;
  products: Product[] = [];
  cart: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    alert(`${product.name} به سبد خرید اضافه شد!`);
  }
  getDiscountedPrice(product: Product): number {
  if (product.discount && product.discount > 0) {
    return product.price * (1 - product.discount / 100);
  }
  return product.price;
}
}
