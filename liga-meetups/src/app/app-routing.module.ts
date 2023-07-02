import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetupsComponent } from '../app/modules/meetups/meetups.component';
import { MyMeetupsComponent } from './modules/my-meetups/my-meetups.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { CreateMeetupComponent } from '../app/modules/create-meetup/create-meetup.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [
  { path: 'all-meetups', component: MeetupsComponent },
  { path: 'my-meetups', component: MyMeetupsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'meetup', component: CreateMeetupComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
