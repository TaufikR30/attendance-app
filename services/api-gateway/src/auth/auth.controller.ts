import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import * as requestWithSite from 'src/common/request-with-site';
import { JwtPayload } from 'src/common/request-with-user';
import { SITE_POLICY } from 'src/common/site-policy';
import { clearAuthCookie, setAuthCookie } from 'src/common/helpers/cookie';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
    private readonly cfg: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Req() req: requestWithSite.RequestWithSite,
    @Res() res: express.Response,
  ) {
    // Hit service auth
    const { token } = await this.authService.login(dto);

    // Verify JWT
    const payload = await this.jwt.verifyAsync<JwtPayload>(token);

    // CEK ROLE SESUAI NGGAK
    const allow = SITE_POLICY[req.site].loginAllowRoles;
    if (!allow.includes(payload.role)) {
      throw new ForbiddenException('Role not allowed on this site');
    }

    setAuthCookie(res, token, {
      name: this.cfg.get<string>('COOKIE_NAME', 'auth'),
      secure: this.cfg.get<string>('COOKIE_SECURE') === 'true',
      sameSite: (this.cfg.get<string>('COOKIE_SAMESITE') as any) || 'lax',
    });

    res.json();
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res() res: express.Response) {
    clearAuthCookie(res, {
      name: this.cfg.get<string>('COOKIE_NAME', 'auth'),
      secure: this.cfg.get<string>('COOKIE_SECURE') === 'true',
      sameSite: (this.cfg.get<string>('COOKIE_SAMESITE') as any) || 'lax',
    });
    res.json({ ok: true });
  }
}
