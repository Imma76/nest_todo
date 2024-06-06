import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    createTask(userId: number, data: Prisma.TodoCreateWithoutUserInput) {
        return this.prisma.todo.create({
            data: {
                ...data,
                userId: userId
            }
        });
    }

    getTask() {
        return this.prisma.todo.findMany({ include: { user: true } });
    }

    getTaskById(id: number) {
        return this.prisma.todo.findUnique({ where: { id: id } });
    }
}
