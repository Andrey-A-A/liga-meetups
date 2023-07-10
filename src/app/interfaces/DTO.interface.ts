export interface MeetupDTO {
  id?: number,
  name: string,
  description: string,
  location: string,
  target_audience: string,
  need_to_know: string,
  will_happen: string,
  reason_to_come: string,
  time: string,
  duration: number,
  createdBy?: number,
  createdAt?: string,
  users?: UserDTO[],
  owner?: OwnerDTO,
}

export interface UserDTO {
  id: number,
  email: string,
  password: string,
  fio?: string,
  roles?: RoleDTO[]
}

export interface OwnerDTO {
  fio: string
}

export interface RoleDTO {
  id: number,
  name: string,
}
