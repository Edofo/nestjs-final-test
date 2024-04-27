import { Module } from "@nestjs/common";


import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

import { DatabaseModule } from "@infrastructures/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
