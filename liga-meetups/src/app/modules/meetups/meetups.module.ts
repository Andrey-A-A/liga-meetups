import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupsComponent } from './meetups.component';
import { MeetupComponent } from '../meetup/meetup.component';
// import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';


const materialModules = [
  MatPaginatorModule
];

@NgModule({
  declarations: [
    MeetupsComponent,
    MeetupComponent,
  ],
  imports: [
    CommonModule,
      ...materialModules
  ],
  exports: [
    MeetupsComponent,
      ...materialModules
  ]
})
export class MeetupsModule { }
