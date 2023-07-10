import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  appTitle = 'MeetUps';

  public status = 1

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url !== '/my-meetups' && e.url !== '/all-meetups' && e.url !== '/users') {
          this.status = 0
        }
      }
    });
  }

  public activeLink(status: number) {
    this.status = status
  }

  public isAdmin() {
    return this.authService.isAdmin()
  }

  public LogOut() {
    this.authService.logout()
  }

  public isAuthorised() {
    if (this.authService.getToken()) {
      return true
    } else return false
  }
}
