import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  appTitle = 'MeetUps';

  constructor(private authService: AuthService) {

  }


  public needDisplay() {
    return this.authService.isAdmin()
  }

}
