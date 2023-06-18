import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetupsComponent } from './meetups.component';
import { MeetupComponent } from '../meetup/meetup.component'


@NgModule({
  declarations: [
    MeetupsComponent,
    MeetupComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MeetupsComponent
  ]
})
export class MeetupsModule { }
