import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
  available?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'آبمیوه طبیعی', description: 'آبمیوه تازه و خنک', price: 30000, discount: 10, image: '/assets/login3.jpg', category: 'cold-drinks', available: true },
    { id: 2, name: 'قهوه اسپرسو', description: 'یه فنجون قهوه غلیظ', price: 35000, discount: 0, image: '/assets/login3.jpg', category: 'hot-drinks', available: true },
    { id: 3, name: 'لاته', description: 'لاته خامه‌ای و معطر', price: 40000, discount: 15, image: '/assets/login3.jpg', category: 'hot-drinks', available: true },
    { id: 4, name: 'چای سبز', description: 'چای سبز ارگانیک', price: 25000, discount: 0, image: '/assets/login3.jpg', category: 'hot-drinks', available: true },
    { id: 5, name: 'پاستا بولونز', description: 'پاستا با سس گوشت', price: 75000, discount: 5, image: '/assets/login3.jpg', category: 'pasta', available: true },
    { id: 6, name: 'پیتزا مارگاریتا', description: 'پیتزا با پنیر تازه', price: 80000, discount: 0, image: '/assets/login3.jpg', category: 'pizza', available: true },
    { id: 7, name: 'کیک شکلاتی', description: 'کیک تازه با شکلات', price: 45000, discount: 10, image: '/assets/login3.jpg', category: 'cake', available: true },
    { id: 8, name: 'بستنی وانیلی', description: 'بستنی خامه‌ای', price: 25000, discount: 0, image: '/assets/login3.jpg', category: 'ice-cream', available: true },
    { id: 9, name: 'نان و پنیر', description: 'صبحانه سنتی', price: 30000, discount: 0, image: '/assets/login3.jpg', category: 'breakfast', available: true },
    { id: 10, name: 'سالاد سزار', description: 'سالاد با سس سزار', price: 40000, discount: 5, image: '/assets/login3.jpg', category: 'salad', available: true },
    { id: 11, name: 'قهوه اسپرسو', description: 'یه فنجون قهوه غلیظ و خوشمزه', price: 35000, image: '/assets/login3.jpg', category: 'coffee', available: true },
    { id: 12, name: 'قهوه لاته', description: 'قهوه ملایم با شیر', price: 40000, image: '/assets/latte.jpg', category: 'coffee', available: true },
    { id: 13, name: 'کیک توت فرنگی', description: 'کیک تازه با طعم شکلات خالص', price: 45000, image: '/assets/login3.jpg', category: 'cake', available: true },
    { id: 14, name: 'کیک بستنی', description: 'کیک تازه با طعم وانیل', price: 40000, image:'/assets/login3.jpg', category: 'cake', available: true },
    { id: 17, name: ' سالاد ماکارونی', description: 'کیک تازه با شکلات', price: 45000, discount: 10, image: '/assets/login3.jpg', category: 'cake', available: true },
    { id: 18, name: ' املت', description: 'بستنی خامه‌ای', price: 25000, discount: 0, image: '/assets/login3.jpg', category: 'breakfast', available: true },
    { id: 19, name: 'نان و پنیر', description: 'صبحانه سنتی', price: 30000, discount: 0, image: '/assets/login3.jpg', category: 'breakfast', available: true },
    { id: 20, name: 'سالاد سزار', description: 'سالاد با سس سزار', price: 40000, discount: 5, image: '/assets/login3.jpg', category: 'salad', available: true },
    { id: 21, name: 'بستنی شکلاتی', description: 'بستنی خامه‌ای', price: 25000, discount: 0, image: '/assets/login3.jpg', category: 'ice-cream', available: true },
    { id: 1, name: 'آبمیوه پرتقال', description: 'آبمیوه تازه و خنک', price: 30000, discount: 10, image: '/assets/login3.jpg', category: 'cold-drinks', available: true },
     { id: 6, name: 'پیتزا پپرونی', description: 'پیتزا با پنیر تازه', price: 80000, discount: 0, image: '/assets/login3.jpg', category: 'pizza', available: true },
    { id: 5, name: 'پاستا آلفردو', description: 'پاستا با سس گوشت', price: 75000, discount: 5, image: '/assets/login3.jpg', category: 'pasta', available: true }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  searchFood(exactName: string): Product | null {
    const found = this.products.find(product => product.name.toLowerCase() === exactName.toLowerCase() && product.available);
    return found || null;
  }

  suggestSimilarFood(exactName: string): string[] {
    const lowerCaseName = exactName.toLowerCase();
    const similar = this.products.filter(product => 
      product.name.toLowerCase().includes(lowerCaseName) && product.available && product.name !== exactName
    ).map(product => product.name);
    return similar.length > 0 ? similar : ['هیچ پیشنهاد مشابهی یافت نشد'];
  }
}