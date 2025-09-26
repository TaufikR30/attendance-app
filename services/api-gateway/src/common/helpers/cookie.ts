import { Response } from 'express';
import * as cookie from 'cookie';

type Opts = {
  secure: boolean;
  sameSite: 'lax' | 'none' | 'strict';
  name: string;
  path?: string;
};

export const setAuthCookie = (
  res: Response,
  token: string,
  { secure, sameSite, name, path }: Opts,
) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(name, token, {
      httpOnly: true,
      secure,
      sameSite,
      path: path ?? '/',
      maxAge: 60 * 60 * 24,
    }),
  );
};

export const clearAuthCookie = (
  res: Response,
  { secure, sameSite, name, path }: Opts,
) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(name, '', {
      httpOnly: true,
      secure,
      sameSite,
      path: path ?? '/',
      maxAge: 0,
    }),
  );
};
