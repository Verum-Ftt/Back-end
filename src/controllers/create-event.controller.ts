import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from 'src/auth/jwt.strategy';
import { PrismaService } from "src/prisma/prisma.service";
import { CurrentUser } from "src/auth/current-user-decorator";
import { ZodValidationPipe } from "src/pipes/zod-valitation-pipe";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { createEventBodySchema, CreateEventBodySchema } from "src/interfaces/create_event.interfaces";

@Controller('/event')
@UseGuards(AuthGuard('jwt'))
export class CreateEventController{
    constructor( private prisma: PrismaService ) {}

    @Post()
    async handle(
        @CurrentUser() user: UserPayload,
        @Body( new ZodValidationPipe(createEventBodySchema) ) body: CreateEventBodySchema ){

        const { description, date } = body
        const { sub: userId} = user

        await this.prisma.events.create({
            data: {
                created_by: userId,
                description,
                date,
            }
        })
    }
}