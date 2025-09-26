import type { Site } from './request-with-site';

export const SITE_POLICY: Record<
  Site,
  {
    loginAllowRoles: Array<'ADMIN' | 'EMPLOYEE'>;
  }
> = {
  admin: { loginAllowRoles: ['ADMIN'] },
  employee: { loginAllowRoles: ['ADMIN', 'EMPLOYEE'] },
};
