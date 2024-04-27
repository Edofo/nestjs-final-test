import type { User } from "@prisma/client";

import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";

import isValidEmail from "../../../helpers/validate/isValidEmail";
import { PrismaService } from "../../../infrastructure/database/services/prisma.service";
import { AddUserDto } from "../dtos/add-user.dto";
import { GetUserDto } from "../dtos/get-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async addUser(email: AddUserDto["email"]): Promise<Partial<User> | ConflictException> {
        if (!isValidEmail(email)) throw new BadRequestException("Invalid email");

        const userExist = await this.prisma.user.findUnique({ where: { email } });
        if (userExist) throw new ConflictException("User already exists");

        return await this.prisma.user.create({
            data: {
                email,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
    }

    async getUser(email: GetUserDto["email"]): Promise<Partial<User> | NotFoundException> {
        return await this.prisma.user
            .findUniqueOrThrow({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            })
            .catch(() => new NotFoundException("User not found"));
    }

    async resetData(): Promise<string> {
        await this.prisma.user.deleteMany();

        return "Data has been reset";
    }
}
