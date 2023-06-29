import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService) {

  }
  Login() {
    console.log("вы входите в систему")
    this.authService.login(this.email, this.password)

  }

  Logout() {
    console.log("вы выходите из системы")
    this.authService.logout()
  }

  ngOnInit() {
    
  }
}


