import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetupsComponent } from '../app/modules/meetups/meetups.component';
import { LoginComponent } from './modules/auth/login/login.component';

const routes: Routes = [
  { path: 'all-meetups', component: MeetupsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
