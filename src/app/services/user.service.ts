import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RoleDTO, UserDTO } from '../interfaces/DTO.interface';
import { User, Role } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = `${environment.backendOrigin}/user`;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http
    .get<UserDTO[]>(`${this.baseUrl}`)
  }

  public transform(dto: UserDTO):User {
    return {
      id: dto.id!,
      email: dto.email,
      password: dto.password,
      fio: dto.fio!,
      roles: dto.roles!.map(el =>{
        return  this.transformRole(el)
      })
    }
  }

  private transformRole(dto: RoleDTO):Role {
    return {
      id: dto.id!,
      name: dto.name,
    }
  }

  public updateUser(email: string, password: string, id: number) {
    return this.http.put<UserDTO>(`${this.baseUrl}/${id}`, {body:{email: email, password: password}})
  }

  public setRole(id: number, roles: string[]) {
    return this.http.post<any>(`${this.baseUrl}/role`, {names: roles, userId: id})
  }
}
