import { Request } from 'express';
export type Site = 'admin' | 'employee';
export type RequestWithSite = Request & { site: Site };
