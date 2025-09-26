import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestWithSite, Site } from '../request-with-site';
@Injectable()
export class SiteContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const r = req as RequestWithSite;

    const host = req.hostname.toLowerCase();
    let site: Site | null = null;
    if (host.startsWith('admin-api')) site = 'admin';
    else if (host.startsWith('emp-api')) site = 'employee';

    if (!site) throw new BadRequestException('Unknown site');
    r.site = site;
    next();
  }
}
