// src/app/cart/cart.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component'; 
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CartComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CartComponent 
  ]
})
export class CartModule { }