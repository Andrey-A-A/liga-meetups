import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetupsModule } from './modules//meetups/meetups.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptors';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { LogoutComponent } from './modules/auth/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    MeetupsModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
