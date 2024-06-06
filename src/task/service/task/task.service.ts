import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  createTask(userId: number, data: Prisma.TodoCreateWithoutUserInput) {
    return this.prisma.todo.create({
      data: {
        ...data,
        userId: userId,
      },
    });
  }

  getTask() {
    return this.prisma.todo.findMany({ include: { user: true } });
  }

  getTaskById(id: number) {
    return this.prisma.todo.findUnique({ where: { id: id } });
  }
  getTaskByName(name: string) {
    return this.prisma.todo.findMany({ where: { title: name } });
  }
  updateTask(updateData: any) {
    return this.prisma.todo.update({
      where: {
        id: updateData.id,
      },

      data: updateData,
    });
  }
}
