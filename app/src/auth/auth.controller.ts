import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ValidUserDto } from 'src/users/dtos/valid-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { LocalAuthGuard } from './local.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return plainToClass(ValidUserDto, req.user.toObject());
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return plainToClass(
      ValidUserDto,
      await this.userService.create({
        ...createUserDto,
        password: await this.authService.hashPassword(createUserDto.password),
      }),
    );
  }
}
