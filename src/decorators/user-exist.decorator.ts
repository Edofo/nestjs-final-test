// user-exists.decorator.ts
import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";

import isValidEmail from "../helpers/validate/isValidEmail";
import { PrismaService } from "../infrastructure/database/services/prisma.service";

type UserExistsParam = "email" | "userId";

export const UserExists = createParamDecorator(async (param: UserExistsParam, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const email = request.params.email || request.body.email;
    const userId = request.params.userId || request.body.userId;

    if (!email && !userId) throw new BadRequestException("Email or userId is required");

    if (email && !isValidEmail(email)) throw new BadRequestException("Invalid email");

    const prismaService = new PrismaService();
    const searchParam = email ? { email } : { id: userId };

    const userExists = await prismaService.user
        .findUniqueOrThrow({ where: searchParam })
        .catch(() => false)
        .finally(() => prismaService.$disconnect());
    if (!userExists) throw new BadRequestException(`User with ${param} does not exist`);

    return email || userId;
});
