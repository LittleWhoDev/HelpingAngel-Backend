import { ProfileInterface } from '../interfaces/profile'
import { UserRole } from '../interfaces/user'

export interface RegisterDTO {
  username: string
  email?: string
  password: string
  role: UserRole
  profile: ProfileInterface
}

export interface LoginDTO {
  username: string
  password: string
}

export interface SuccessDTO {
  username: string
  role: UserRole
  token?: string
}
