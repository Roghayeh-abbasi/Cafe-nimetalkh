import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [], // LoginComponent رو حذف کردیم چون standalone هست
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
  ],
  providers: [AuthService],
  exports: [] // LoginComponent رو از exports حذف کردیم
})
export class AuthModule { }