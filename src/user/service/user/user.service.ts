import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    createUser(createUserDto: Prisma.UserCreateInput) {
        return this.prismaService.user.create({ data: createUserDto })
    }
}
