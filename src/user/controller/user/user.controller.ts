import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/service/user/user.service';

import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    const salt = 10;
    const hash = bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.password = hash;
    const user = await this.userService.createUser(createUserDto);
    return { status: true, message: 'User created successfully', data: user };
  }
}
