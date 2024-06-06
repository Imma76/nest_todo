import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/service/user/user.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    const salt = 10;
    const hash = bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.password = hash;
    const user = await this.userService.createUser(createUserDto);
    return { status: true, message: 'User created successfully', data: user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const salt = 10;
    const user = await this.userService.loginUser(loginDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const verify = bcrypt.compareSync(loginDto.password, user.password);
    if (!verify) {
      throw new NotFoundException('Invalid details');
    }
    user.password = undefined;
    const token = await this.jwtService.signAsync(
      { user },
      {
        privateKey: process.env.privateKey,
        secret: process.env.salt,
      },
    );
    return {
      status: true,
      message: 'Login successful',
      data: user,
      token: token,
    };
  }
}
