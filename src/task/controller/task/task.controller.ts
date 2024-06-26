import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto, TaskDto } from 'src/dto/task.dto';
import { TaskService } from 'src/task/service/task/task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() { userId, ...createTaskDto }: CreateTaskDto) {
    return this.taskService.createTask(userId, createTaskDto);
  }

  @Get()
  async getTask() {
    const task = await this.taskService.getTask();
    return { status: true, data: task };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.getTaskById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return { status: true, data: task };
  }

  @Get(':name')
  async getTaskByName(@Query('name') name: string) {
    const task = this.taskService.getTaskByName(name);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return { status: true, data: task };
  }

  @Post('update')
  async updateTask(@Body() createTask: TaskDto) {
    await this.getTaskById(createTask.id);
    const task = await this.taskService.updateTask(createTask);
    return { status: true, data: task };
  }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const task =  await this.taskService.deleteTask(id);
        return { status: true, data: 'todo deleted' };

    }

}
