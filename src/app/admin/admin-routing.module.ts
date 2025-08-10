import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../core/admin.guard';
import { AdminProductsComponent } from './a-products/a-products.component';
import { AOrdersComponent } from './a-orders/a-orders.component';
import { AUsersComponent } from './a-users/a-users.component';
import { AReportsComponent } from './a-reports/a-reports.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AOrdersComponent },
      { path: 'users', component: AUsersComponent },
      { path: 'reports', component: AReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }