import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: any[], category: string): any[] {
    if (!products || !category) {
      return products;
    }
    if (category === 'all') {
      return products;
    }
    return products.filter(product => product.category === category);
  }
}