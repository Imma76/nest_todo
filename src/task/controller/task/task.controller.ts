import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
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

    @Get()
    getTask() {
        return this.taskService.getTask();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async getTaskById(@Param('id', ParseIntPipe) id: number) {

        const task = await this.taskService.getTaskById(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return { status: true, data: task }
    }
}
