import { User } from "@prisma/client";

import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../../../infrastructure/database/services/prisma.service";
import { AddUserDto } from "../dtos/add-user.dto";
import { GetUserDto } from "../dtos/get-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async addUser(email: AddUserDto["email"]): Promise<User | ConflictException> {
        console.log(email);
        await this.prisma.user
            .findUniqueOrThrow({ where: { email } })
            .catch(() => new ConflictException("User already exists"));

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

    async getUser(email: GetUserDto["email"]): Promise<User | NotFoundException> {
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
