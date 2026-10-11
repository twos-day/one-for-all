import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CHZZK_API_URL } from './chzzk.const.js';

@Injectable()
export class ChzzkService {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: CHZZK_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': process.env.CHZZK_CLIENT_ID,
        'Client-Secret': process.env.CHZZK_CLIENT_SECRET,
      },
    });
  }

  async getLives() {
    const { data } = await this.axiosInstance.get('/open/v1/lives');
    return data;
  }
}
