import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/task.dto';
import { TaskService } from 'src/task/service/task/task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createTask(@Body() { userId, ...createTaskDto }: CreateTaskDto) {

        return this.taskService.createTask(userId, createTaskDto);
    }
}
