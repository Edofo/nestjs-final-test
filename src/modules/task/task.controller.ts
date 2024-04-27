import { Controller, Get, Param } from "@nestjs/common";
import { Body, Post } from "@nestjs/common";

import { TaskService } from "./task.service";

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    createTask(@Body() { name, userId, priority }: { name: string; userId: string; priority: number }) {
        return this.taskService.addTask(name, userId, priority);
    }

    @Get("/user/:userId")
    getUserTasks(@Param("userId") userId: string) {
        return this.taskService.getUserTasks(userId);
    }
}
