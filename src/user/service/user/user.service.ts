import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LoginDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  createUser(createUserDto: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  loginUser(loginUserDto: LoginDto) {
    return this.prismaService.user.findUnique({
      where: { username: loginUserDto.username },
    });
  }
}
