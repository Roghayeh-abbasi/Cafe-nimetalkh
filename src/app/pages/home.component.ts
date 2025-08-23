import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CategoryFilterPipe } from '../core/category-filter.pipe';
import { CartService } from '../core/cart.service';
import { ProductService, Product } from '../core/product.service';
import { OrderService } from '../core/order.service';

interface MenuItem {
  name: string;
  sectionId: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, CategoryFilterPipe],
  standalone: true
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoggedIn = false;
  isScrolled = false;
  activeMenuItem: number | null = null;
  searchQuery = '';
  cartItemCount: number = 0;
  username: string = '';
  profileImage: string | null = null;
  pendingOrdersCount: number = 0;

  menuItems: MenuItem[] = [
    { name: 'نوشیدنی‌', sectionId: 'cold-drinks', image: '/assets/imge2.png' },
    { name: 'قهوه', sectionId: 'hot-drinks', image: '/assets/imge2.png' },
    { name: 'پاستا', sectionId: 'pasta', image: '/assets/imge2.png' },
    { name: 'پیتزا', sectionId: 'pizza', image: '/assets/imge2.png' },
    { name: 'کیک', sectionId: 'cake', image: '/assets/imge2.png' },
    { name: 'بستنی', sectionId: 'ice-cream', image: '/assets/imge2.png' },
    { name: 'صبحانه', sectionId: 'breakfast', image: '/assets/imge2.png' },
    { name: 'سالاد', sectionId: 'salad', image: '/assets/imge2.png' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = [...products];
    });
    this.cartItemCount = this.cartService.getTotalItems();
    this.authService.getLoggedInUser().subscribe(user => {
      console.log('User loaded:', user);
      if (user) {
        this.username = user.username || '';
      } else {
        this.username = '';
      }
    });
    this.profileImage = localStorage.getItem('profileImage') || null;
    this.loadPendingOrdersCount();
  }

  loadPendingOrdersCount(): void {
    this.orderService.getPendingOrdersCount().subscribe(count => {
      this.pendingOrdersCount = count;
      console.log('Pending orders count:', this.pendingOrdersCount);
    });
  }

 addToCart(product: Product): void {
  console.log('تلاش برای افزودن محصول:', product);
  if (!this.isLoggedIn) {
    console.log('کاربر وارد نشده است، ریدایرکت به /auth/login');
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/' } });
    return;
  }
  // تنظیم مقدار پیش‌فرض برای quantity
  const productWithQuantity = {
    ...product,
    quantity: product.quantity ?? 1 // اگر quantity undefined باشد، 1 قرار بده
  };
  this.cartService.addToCart(productWithQuantity);
  this.cartItemCount = this.cartService.getTotalItems();
  console.log('محصول به سبد اضافه شد:', productWithQuantity, 'سبد فعلی:', this.cartService.getCart());
}
  // addToCart(product: Product): void {
  //   console.log('تلاش برای افزودن محصول:', product);
  //   if (!this.isLoggedIn) {
  //     console.log('کاربر وارد نشده است، ریدایرکت به /auth/login');
  //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/' } });
  //     return;
  //   }
  //   this.cartService.addToCart(product);
  //   this.cartItemCount = this.cartService.getTotalItems();
  //   console.log('محصول به سبد اضافه شد:', product, 'سبد فعلی:', this.cartService.getCart());
  // }

  showCartPage(): void {
    console.log('تلاش برای رفتن به صفحه سبد خرید، تعداد محصولات:', this.cartService.getTotalItems());
    if (this.cartService.getTotalItems() === 0) {
      alert('سبد خرید خالی است!');
      return;
    }
    this.router.navigate(['/cart']);
  }

  searchProducts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const h3Element = section.querySelector('h3') as HTMLElement;
      if (h3Element) {
        const header = document.querySelector('.header-with-bg') as HTMLElement;
        const stickyMenu = document.querySelector('.sticky-menu') as HTMLElement;
        const headerOffset = (header?.offsetHeight || 0) + (stickyMenu?.offsetHeight || 0) + 10; // 10px حاشیه اضافی
        const elementPosition = h3Element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  setActiveMenuItem(index: number): void {
    this.activeMenuItem = index;
  }

  getDiscountedPrice(product: Product): number {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  }

  getTotalPrice(): number {
    return this.cartService.getCart().reduce((total, item) => total + this.getDiscountedPrice(item), 0);
  }
}