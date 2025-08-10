import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileAddressesComponent } from './profile-addresses/profile-addresses.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProfilePointsComponent } from './profile-points/profile-points.component';
import { ProfileDiscountsComponent } from './profile-discounts/profile-discounts.component';
import { ProfilePaymentsComponent } from './profile-payments/profile-payments.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'info', component: ProfileInfoComponent },
      { path: 'settings', component: ProfileSettingsComponent },
      { path: 'addresses', component: ProfileAddressesComponent },
      { path: 'orders', component: ProfileOrdersComponent },
      { path: 'points', component: ProfilePointsComponent },
      { path: 'discounts', component: ProfileDiscountsComponent },
      { path: 'payments', component: ProfilePaymentsComponent },
      { path: '', redirectTo: 'info', pathMatch: 'full' }
    ]
  }
];

console.log('UserRoutingModule loaded with routes:', routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }