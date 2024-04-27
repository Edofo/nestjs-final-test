// user-exists.decorator.ts
import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";

import isValidEmail from "../helpers/validate/isValidEmail";
import { PrismaService } from "../infrastructure/database/services/prisma.service";

export const UserExists = createParamDecorator(async (param: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { email, userId } = request.params;

    if (email && !isValidEmail(email)) throw new BadRequestException("Invalid email");

    const prismaService = new PrismaService();
    const searchParam = email ? { email } : { id: userId };

    const userExists = await prismaService.user.findUniqueOrThrow({ where: searchParam }).catch(() => false);
    if (!userExists) throw new BadRequestException(`User with ${param} ${request.headers[param]} does not exist`);

    return request.params[param];
});
