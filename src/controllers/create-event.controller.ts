import { z } from "zod";
import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from 'src/auth/jwt.strategy'
import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { createEventBodySchema, CreateEventBodySchema } from "src/interfaces/create_event.interfaces";
import { ZodValidationPipe } from "src/pipes/zod-valitation-pipe";

@Controller('/event')
@UseGuards(AuthGuard('jwt'))
export class CreateEventController{
    constructor() {
        prisma: PrismaService
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createEventBodySchema))
    async handle(

        @CurrentUser() user: UserPayload,
        @Body() body: CreateEventBodySchema 

    ) {
        
        console.log(user.sub)
        return 'Hello World'
    }
}