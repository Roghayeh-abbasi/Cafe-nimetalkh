import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AUsersComponent } from './a-users/a-users.component';
import { AReportsComponent } from './a-reports/a-reports.component';
import { AdminProductsComponent } from './a-products/a-products.component'; // تغییر از AProductsComponent

@NgModule({
  declarations: [
    AUsersComponent,
    AReportsComponent,
    AdminProductsComponent 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
})
export class AdminModule { }