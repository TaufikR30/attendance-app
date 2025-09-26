import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/role.decorator';
interface AuthUser {
  role: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user: AuthUser = request['user'];
    const isMatchingRole = roles.includes(user.role);

    if (!isMatchingRole) {
      throw new ForbiddenException('ADMINS_ONLY');
    }

    return true;
  }
}
