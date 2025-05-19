import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from "@/infrastructure/auth/jwt.strategy";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ZodValidationPipe } from "@/interfaces/pipes/zod-valitation-pipe";
import { PageQueryParamSchema, pageQueryParamSchema } from "./dtos/fecth-sub.dto";
import { CurrentUser } from "../../../infrastructure/auth/current-user.decorator";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { createSubEventBodySchema, CreateSubEventBodySchema } from "./dtos/create-sub.dto";
import { CreateSubEventParamSchema, createSubEventParamSchema } from "./dtos/params-sub.dto";

@Controller('/sub-events')
@UseGuards(AuthGuard('jwt'))
export class SubEventController{
    constructor( private prisma: PrismaService ) {}

    @Post('/create/:event_id/:subjective_id')
    async postSubEvent(
        @CurrentUser() user: UserPayload,
        @Param( new ZodValidationPipe(createSubEventParamSchema) ) params: CreateSubEventParamSchema,
        @Body( new ZodValidationPipe(createSubEventBodySchema) ) body: CreateSubEventBodySchema )
        
        {
            const { title, description, date } = body
            const { sub:userId } = user
            const { subjective_id, event_id } = params

            await this.prisma.sub_event.create({
                data:{
                    title,
                    description,
                    date,
                    event_id,
                    subjective_id,
                    created_by: userId,
                }
            })
        }

    @Get('/findAll')
    async getAllSubEvent(
        @Query('page', new ZodValidationPipe(pageQueryParamSchema) ) page: PageQueryParamSchema) 
        
        {
        const perPage = 20
        const subEvent = await this.prisma.sub_event.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: { date_created: "desc" }
        })
    
            return { subEvent }
        }
}