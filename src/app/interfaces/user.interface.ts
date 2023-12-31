export interface User {
  id: number,
  email: string,
  password: string,
  fio: string,
  roles: Role[]
}

export interface Role {
  id: number,
  name: string,
}
