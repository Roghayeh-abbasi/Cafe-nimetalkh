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


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { CategoryFilterPipe } from '../core/category-filter.pipe';
// import { ProductService, Product } from '../core/product.service';

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule, CategoryFilterPipe],
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   category: string | null = null;
//   products: Product[] = [];
//   cart: Product[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.category = this.route.snapshot.paramMap.get('category');
//     this.productService.getProducts().subscribe((products: Product[]) => {
//       this.products = products;
//     });
//   }

//   addToCart(product: Product): void {
//     this.cart.push(product);
//     alert(`${product.name} به سبد خرید اضافه شد!`);
//   }
//   getDiscountedPrice(product: Product): number {
//   if (product.discount && product.discount > 0) {
//     return product.price * (1 - product.discount / 100);
//   }
//   return product.price;
// }
// }



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { CategoryFilterPipe } from '../core/category-filter.pipe';

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
// }

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule, CategoryFilterPipe],
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   category: string | null = null;
//   products: Product[] = [
//     { id: 1, name: 'قهوه اسپرسو', description: 'یه فنجون قهوه غلیظ و خوشمزه', price: 35000, image: '/assets/coffee.jpg', category: 'coffee' },
//     { id: 2, name: 'قهوه لاته', description: 'قهوه ملایم با شیر', price: 40000, image: '/assets/latte.jpg', category: 'coffee' },
//     { id: 3, name: 'کیک شکلاتی', description: 'کیک تازه با طعم شکلات خالص', price: 45000, image: '/assets/cake.jpg', category: 'cake' },
//     { id: 4, name: 'کیک وانیلی', description: 'کیک تازه با طعم وانیل', price: 40000, image: '/assets/vanilla-cake.jpg', category: 'cake' },
//     { id: 5, name: 'چای سبز', description: 'چای سبز ارگانیک و معطر', price: 25000, image: '/assets/tea.jpg', category: 'tea' },
//     { id: 6, name: 'چای سیاه', description: 'چای سیاه با عطر طبیعی', price: 20000, image: '/assets/black-tea.jpg', category: 'tea' }
//   ];
//   cart: Product[] = [];

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.category = this.route.snapshot.paramMap.get('category');
//   }

//   addToCart(product: Product): void {
//     this.cart.push(product);
//     alert(`${product.name} به سبد خرید اضافه شد!`);
//   }
// }