import { ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User, UserRole } from 'src/users/user.schema';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isJwtValid = await super.canActivate(context);
    const roles =
      this.reflector.get<UserRole[]>('roles', context.getHandler()) ||
      new Array<UserRole>();

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    return isJwtValid && (roles.length === 0 || roles.includes(user.role));
  }
}

export const UseRolesGuard = () => UseGuards(RolesGuard);
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
