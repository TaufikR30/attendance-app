import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser, JwtPayload } from '../request-with-user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly cfg: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const cname = this.cfg.get<string>('COOKIE_NAME', 'auth');
    const token = req.cookies?.[cname];

    if (!token) throw new UnauthorizedException('MISSING_TOKEN');

    try {
      const p = await this.jwt.verifyAsync<JwtPayload>(token as string);
      req.user = { ...p };
      return true;
    } catch {
      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }
}
