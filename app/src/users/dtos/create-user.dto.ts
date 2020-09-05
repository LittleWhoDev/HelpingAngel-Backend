import { UserRole } from '../user.schema';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
