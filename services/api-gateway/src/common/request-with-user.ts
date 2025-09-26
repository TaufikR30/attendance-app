import { Request } from 'express';

export type JwtRole = 'ADMIN' | 'EMPLOYEE';

export type JwtPayload = {
  id: string;
  role: JwtRole;
  name?: string;
  email?: string;
};

export type RequestWithUser = Request & {
  user?: { id: string; role: JwtRole; name?: string; email?: string };
};
