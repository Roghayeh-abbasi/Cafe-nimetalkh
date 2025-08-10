// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard implements CanActivate {
//   constructor(private router: Router) {}

//  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//   const userData = localStorage.getItem('currentUser');
//   if (userData) {
//     const user = JSON.parse(userData);
//     if (user.role === 'admin') {
//       return true;
//     }
//   }
//   this.router.navigate(['/auth/login']);
//   return false;
// }

// }

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const isLoggedIn = this.authService.isLoggedIn();

  if (!isLoggedIn) {
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  let user = this.authService.getCurrentUserSync();
  if (!user) {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      user = JSON.parse(stored);
    }
  }

  if (user?.role === 'admin') {
    return true;
  }

  this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
}


}