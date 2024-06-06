import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/task.dto';
import { TaskService } from 'src/task/service/task/task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post()
    createTask(@Body() {userId,...createTaskDto}: CreateTaskDto) {

        return this.taskService.createTask(userId, createTaskDto);
    }
}
