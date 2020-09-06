import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles, UseRolesGuard } from './auth/roles.guard';
import { UserRole } from './users/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseRolesGuard()
  @Roles(UserRole.ANGEL)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
