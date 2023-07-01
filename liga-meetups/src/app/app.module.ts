import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetupsModule } from './modules//meetups/meetups.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptors';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { CreateMeetupComponent } from './modules/create-meetup/create-meetup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateMeetupComponent,
  ],
  imports: [
    BrowserModule,
    MeetupsModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
