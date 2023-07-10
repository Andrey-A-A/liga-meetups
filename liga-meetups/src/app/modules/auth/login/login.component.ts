import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {

  }
  login() {
    console.log("вы входите в систему")
    this.authService.login(this.email, this.password)

  }

  toRegister() {
    setTimeout(() => {this.router.navigate(['registration'])}, 500)
  }

  ngOnInit() {

  }
}


