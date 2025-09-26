import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpClient {
  readonly axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({ timeout: 5000, maxRedirects: 0 });
  }
}
