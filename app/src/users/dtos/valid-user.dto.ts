import { UserRole } from '../user.schema';
import { Exclude } from 'class-transformer';

export class ValidUserDto {
  username: string;
  email?: string;
  role: UserRole;

  @Exclude()
  password;
}
