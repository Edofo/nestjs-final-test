import type { Task } from "@prisma/client";

import { BadRequestException, Injectable } from "@nestjs/common";

import { PrismaService } from "../../../infrastructure/database/services/prisma.service";
import { AddTaskDto } from "../dtos/add-task.dto";

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    addTask(name: AddTaskDto["name"], userId: AddTaskDto["userId"], priority: AddTaskDto["priority"]): Promise<Task> {
        return this.prisma.task.create({
            data: {
                name,
                priority: Number(priority),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    getTaskByName(name: string): Promise<Task | null> {
        return this.prisma.task.findFirst({
            where: {
                name,
            },
        });
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        await this.prisma.user
            .findUniqueOrThrow({
                where: {
                    id: userId,
                },
            })
            .catch(() => {
                new BadRequestException("User not found");
            });
        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany();
        return Promise.resolve();
    }
}
