import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isAxiosError } from 'axios';
import { HttpClient } from 'src/common/axios';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly cfg: ConfigService,
    private readonly http: HttpClient,
  ) {}

  async login(dto: LoginDto): Promise<{ token: string }> {
    const base = this.cfg.get<string>('AUTH_SERVICE_URL');
    if (!base) throw new BadRequestException('AUTH_SERVICE_URL not set');

    try {
      const { data } = await this.http.axios.post<{ token: string }>(
        `${base}/auth/login`,
        dto,
      );
      if (!data?.token) throw new BadRequestException('Invalid auth response');
      return data;
    } catch (err) {
      if (isAxiosError(err)) {
        throw new BadRequestException(err.response?.data ?? err.message);
      }
      throw err;
    }
  }
}
