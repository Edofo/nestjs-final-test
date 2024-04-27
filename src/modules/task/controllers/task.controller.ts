import { Controller, Get } from "@nestjs/common";
import { Body, Post } from "@nestjs/common";

import { UserExists } from "../../../decorators/user-exist.decorator";
import { AddTaskDto } from "../dtos/add-task.dto";
import { TaskService } from "../services/task.service";

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    createTask(@UserExists("userId") userId: string, @Body() { name, priority }: AddTaskDto) {
        return this.taskService.addTask(name, userId, priority);
    }

    @Get("/user/:userId")
    getUserTasks(@UserExists("userId") userId: string) {
        return this.taskService.getUserTasks(userId);
    }
}
