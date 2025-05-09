import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from "@/infrastructure/auth/jwt.strategy";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ZodValidationPipe } from "@/interfaces/pipes/zod-valitation-pipe";
import { CurrentUser } from "@/infrastructure/auth/current-user-decorator";
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { PageQueryParamSchema, pageQueryParamSchema } from "./dtos/fecth-event.dto";
import { createEventBodySchema, CreateEventBodySchema } from "@/interfaces/http/event/dtos/create_event.dto";

@Controller('/events')
@UseGuards(AuthGuard('jwt'))
export class EventController{
    constructor( private prisma: PrismaService ) {}

    @Post()
    async postEvent(
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

        @Get('/get')
        async getEvent(@Query('page', new ZodValidationPipe(pageQueryParamSchema) ) page: PageQueryParamSchema) {
            const perPage = 20
            const events = await this.prisma.events.findMany({
                take: perPage,
                skip: (page - 1) * perPage,
                orderBy: { date_created: "desc" }
            })
    
            return { events }
        }
}