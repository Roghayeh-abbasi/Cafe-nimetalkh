// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// const routes: Routes = [
 
// ];

// @NgModule({
//   declarations: [], 
//   imports: [
//     CommonModule,
//     FormsModule,
//     RouterModule.forChild(routes)
//   ]
// })
// export class UserModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule { }