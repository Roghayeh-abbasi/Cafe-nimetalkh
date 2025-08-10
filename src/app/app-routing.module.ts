
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
//   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//   { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
//   { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
//   { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
//   { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
//   { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
//   { path: 'profile', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
//   { path: '**', redirectTo: '' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/admin.guard';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { 
    path: 'cart', 
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard] 
  },
  { path: 'profile', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }