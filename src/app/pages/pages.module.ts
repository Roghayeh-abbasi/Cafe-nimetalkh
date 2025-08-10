import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    FormsModule,
    HomeComponent 
  ],
  declarations: [] 
})
export class PagesModule { }
