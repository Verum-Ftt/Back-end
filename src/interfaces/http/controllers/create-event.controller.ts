import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from "@/interfaces/auth/jwt.strategy";
import { PrismaService } from "@/application/prisma/prisma.service";
import { CurrentUser } from "@/interfaces/auth/current-user-decorator";
import { ZodValidationPipe } from "@/interfaces/http/pipes/zod-valitation-pipe";
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { PageQueryParamSchema, pageQueryParamSchema } from "../dtos/fecth-event.interfaces";
import { createEventBodySchema, CreateEventBodySchema } from "@/interfaces/http/dtos/create_event.interfaces";

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/events')
@UseGuards(AuthGuard('jwt'))
export class CreateEventController{
    constructor( private prisma: PrismaService ) {}

    @Post()
    async postAcademic(
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
        async getAcademic(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
            const perPage = 20
            const events = await this.prisma.events.findMany({
                take: perPage,
                skip: (page - 1) * perPage,
                orderBy: {
                    date_created: "desc"
                }
            })
    
            return { events }
        }
}