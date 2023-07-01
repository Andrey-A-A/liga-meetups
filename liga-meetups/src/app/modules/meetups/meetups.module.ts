import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupsComponent } from './meetups.component';
import { MeetupComponent } from '../meetup/meetup.component';
import { MyMeetupsComponent } from '../my-meetups/my-meetups.component';
// import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';


const materialModules = [
  MatPaginatorModule
];

@NgModule({
  declarations: [
    MeetupsComponent,
    MeetupComponent,
    MyMeetupsComponent
  ],
  imports: [
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
