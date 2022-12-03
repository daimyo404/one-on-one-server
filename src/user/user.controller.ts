import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): Promise<Users> {
    return this.userService.getUser();
  }
}
