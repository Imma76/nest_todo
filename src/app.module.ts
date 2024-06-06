import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/service/user/user.service';
import { TaskController } from './task/controller/task/task.controller';
import { TaskService } from './task/service/task/task.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UserController, TaskController],
  providers: [AppService, UserService, TaskService, ],
})
export class AppModule {}
