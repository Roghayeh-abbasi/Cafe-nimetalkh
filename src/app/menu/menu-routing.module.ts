// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ProductListComponent } from './product-list.component';

// const routes: Routes = [
//   { path: 'products/:category', component: ProductListComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes), ProductListComponent],
//   exports: [RouterModule]
// })
// export class MenuRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';

const routes: Routes = [
  { path: 'products/:category', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }