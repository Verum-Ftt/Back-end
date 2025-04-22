import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from 'src/auth/jwt.strategy';
import { PrismaService } from "src/prisma/prisma.service";
import { CurrentUser } from "src/auth/current-user-decorator";
import { ZodValidationPipe } from "src/pipes/zod-valitation-pipe";
import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { createEventBodySchema, CreateEventBodySchema } from "src/interfaces/create_event.interfaces";

@Controller('/event')
@UseGuards(AuthGuard('jwt'))
export class CreateEventController{
    constructor( private prisma: PrismaService ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createEventBodySchema))
    async handle(
        @CurrentUser() user: UserPayload,
        @Body() body: CreateEventBodySchema ){

        const { description, date } = body
        const academicId = user.sub

        await this.prisma.events.create({
            data: {
                description,
                date,
                // created_by: academicId,
            }
        })
        console.log(user.sub)
        return 'Hello World'
    }
}