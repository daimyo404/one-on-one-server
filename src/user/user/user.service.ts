import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserService {
  getUser(): string {
    return 'hogehoge';
  }
}