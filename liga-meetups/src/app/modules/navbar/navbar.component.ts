import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  appTitle = 'MeetUps';

  public status = 1

  constructor(private authService: AuthService) {

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
    // return this.authService.getToken !== null
  }
}
