import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../core/product.service'; // از رابط Product در product.service.ts استفاده می‌کنیم

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], category: string | null): Product[] {
    if (!products || !category || category === 'all') {
      return products || [];
    }
    return products.filter(product => product.category === category);
  }
}



// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'categoryFilter',
// })export class CategoryFilterPipe implements PipeTransform {
//   transform(products: any[], category: string): any[] {
//     return category ? products.filter(p => p.category === category) : products;
//   }
// }

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'categoryFilter',
//   standalone: true 
// })
// export class CategoryFilterPipe implements PipeTransform {
//   transform(products: any[], category: string): any[] {
//     if (!products || !category) {
//       return products;
//     }
//     if (category === 'all') {
//       return products;
//     }
//     return products.filter(product => product.category === category);
//   }
// }