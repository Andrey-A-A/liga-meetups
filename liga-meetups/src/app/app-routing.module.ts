import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetupsComponent } from '../app/modules/meetups/meetups.component';
import { MyMeetupsComponent } from './modules/my-meetups/my-meetups.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { CreateMeetupComponent } from '../app/modules/create-meetup/create-meetup.component';
import { UsersComponent } from './modules/users/users.component';
import { RegistrationComponent } from './modules/auth/registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NonAuthGuard } from './shared/guards/non-auth.guard';
import { StartPageComponent } from './modules/start-page/start-page.component';

const routes: Routes = [
  {
    path: 'all-meetups',
    component: MeetupsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-meetups',
    component: MyMeetupsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },

  {
    path: 'meetup',
    component: CreateMeetupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: '',
    component: StartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
