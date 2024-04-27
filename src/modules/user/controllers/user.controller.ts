import { Body, Controller, Delete, Get, HttpCode, Param } from "@nestjs/common";
import { Post } from "@nestjs/common";

import { AddUserDto } from "../dtos/add-user.dto";
import { GetUserDto } from "../dtos/get-user.dto";
import { UserService } from "../services/user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("")
    @HttpCode(201)
    async AddUser(@Body() { email }: AddUserDto) {
        return await this.userService.addUser(email);
    }

    @Get("/:email")
    async GetUser(@Param() { email }: GetUserDto) {
        return await this.userService.getUser(email);
    }

    @Delete("")
    async DeleteAllUser() {
        return await this.userService.resetData();
    }
}
