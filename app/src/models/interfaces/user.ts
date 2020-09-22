import { ProfileInterface } from './profile'

export interface UserInterface {
  username: string
  password: string
  email?: string
  role: UserRole
  profile: ProfileInterface
}

export enum UserRole {
  ANGEL,
  DONOR,
  REQUESTER,
}
export const UserRoles = [UserRole.ANGEL, UserRole.DONOR, UserRole.REQUESTER]
