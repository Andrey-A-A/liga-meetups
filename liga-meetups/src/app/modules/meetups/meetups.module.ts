import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupsComponent } from './meetups.component';
import { MeetupComponent } from '../meetup/meetup.component';
import { MyMeetupsComponent } from '../my-meetups/my-meetups.component';
import { SearchComponent } from '../search/search.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';


const materialModules = [
  MatPaginatorModule
];

@NgModule({
  declarations: [
    MeetupsComponent,
    MeetupComponent,
    MyMeetupsComponent,
    SearchComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
      ...materialModules
  ],
  exports: [
    MeetupComponent,
    MeetupsComponent,
      ...materialModules
  ]
})
export class MeetupsModule { }
