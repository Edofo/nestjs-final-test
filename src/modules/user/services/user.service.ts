import type { User } from "@prisma/client/edge";

import { ConflictException, Injectable } from "@nestjs/common";

import { PrismaService } from "../../../infrastructure/database/services/prisma.service";
import { AddUserDto } from "../dtos/add-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async addUser(email: AddUserDto["email"]): Promise<Partial<User> | ConflictException> {
        if (await this.getUser(email)) throw new ConflictException("User already exists");

        return await this.prisma.user.create({
            data: { email },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
    }

    async getUser(email: string): Promise<Partial<User> | null> {
        return await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
    }

    async resetData(): Promise<string> {
        await this.prisma.user.deleteMany();
        return "Users Data has been reset";
    }
}
