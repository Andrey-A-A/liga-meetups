import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserComponent } from '../user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';


const materialModules = [
  MatPaginatorModule
];


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ]
})
export class UsersModule { }
