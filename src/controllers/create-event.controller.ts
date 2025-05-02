import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from "@/auth/jwt.strategy";
import { PrismaService } from "@/prisma/prisma.service";
import { CurrentUser } from "@/auth/current-user-decorator";
import { ZodValidationPipe } from "@/pipes/zod-valitation-pipe";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { createEventBodySchema, CreateEventBodySchema } from "@/interfaces/create_event.interfaces";

@Controller('/events')
@UseGuards(AuthGuard('jwt'))
export class CreateEventController{
    constructor( private prisma: PrismaService ) {}

    @Post()
    async handle(
        @CurrentUser() user: UserPayload,
        @Body( new ZodValidationPipe(createEventBodySchema) ) body: CreateEventBodySchema ){

        const { description, date } = body
        const { sub: userId } = user

        await this.prisma.events.create({
            data: {
                created_by: userId,
                description,
                date,
            }
        })
    }
}