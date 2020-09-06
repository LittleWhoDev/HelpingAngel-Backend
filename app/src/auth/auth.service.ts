import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './dtos/jwt-payload.dto';
import { JwtResponse } from './dtos/jwt-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async validateUserNoPassword(identifier: string) {
    const user = await this.usersService.findOne(identifier);
    return user ? user : null;
  }

  async login(user: User) {
    return <JwtResponse>{
      access_token: this.jwtService.sign(<JwtPayload>{
        username: user.username,
        id: user.id,
      }),
    };
  }
}
