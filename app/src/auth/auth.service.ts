import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async hashPassword(password: string) {
    return hash(password, 10);
  }

  private async isPasswordValid(user: User, password: string) {
    return user.password === (await this.hashPassword(password));
  }

  async validateUser(identifier: string, password: string) {
    const user = await this.usersService.findOne(identifier);
    return user && this.isPasswordValid(user, password) ? user : null;
  }
}
