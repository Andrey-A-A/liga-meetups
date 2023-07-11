import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
  baseUrl: string = `${environment.backendOrigin}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
    .post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
    .subscribe((res: any) => {
      if (res?.token) {
        localStorage.setItem('del_meetups_auth_token', res.token);
        this.router.navigate(['all-meetups']);
      } else alert('Ошибка при авторизации')
    })
  }

  logout() {
    localStorage.removeItem('del_meetups_auth_token');
    this.router.navigate(['login']);
  }

  isAuth() {
    if (localStorage.getItem('del_meetups_auth_token')) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('del_meetups_auth_token')
  }


  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public get user(): User | null {
    const token = localStorage.getItem('del_meetups_auth_token');
    if (token) {
      const user: User = this.parseJwt(token);
      return user;
    } else return null;
  }

  public get token(): string | null {
    return localStorage.getItem('del_meetups_auth_token');
  }


  public isAdmin(): boolean {
    const token = this.token;
    let result = false;
    if (token) {
      const user:User = this.parseJwt(token)
      user.roles.forEach(element => {

        if (element.name === 'ADMIN') {
          result = true
        }
      });

    }

    return result;
  }

  registration(email: string, password: string, fio: string) {

    return this.http
    .post<{ token: string }>(`${this.baseUrl}/registration`, { email, password, fio })
    .subscribe((res: any) => {
      if (res?.token) {
        this.router.navigate(['login']);
      } else alert('Ошибка при регистрации')

    })
  }

}
