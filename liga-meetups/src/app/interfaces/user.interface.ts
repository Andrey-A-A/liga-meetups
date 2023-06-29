export interface User {
  id: number,
  email: string,
  password: string,
  fio: string,
  roles: Role[]
}

interface Role {
  name: string
}
