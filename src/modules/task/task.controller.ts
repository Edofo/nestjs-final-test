import { BadRequestException, Controller } from "@nestjs/common";

@Controller()
export class TaskController {
    constructor() {}

    if(true) throw new BadRequestException("This is a test exception.");
 }
