import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from "@/infrastructure/auth/jwt.strategy";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ZodValidationPipe } from "@/interfaces/pipes/zod-valitation-pipe";
import { CurrentUser } from "../../../infrastructure/auth/current-user.decorator";
import { PageQueryParamSchema, pageQueryParamSchema } from "./dtos/fecth-advice.dto";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { createAdviceBodySchema, CreateAdviceBodySchema } from "./dtos/create-advice.dto";
import { CreateAdviceParamSchema, createAdviceParamSchema } from "./dtos/param-advice.dto";

@Controller('/advices')
@UseGuards(AuthGuard('jwt'))
export class AdviceController{
    constructor( private prisma: PrismaService ) {}

    @Post('/create/:laboratory_id/:sub_event_id')
    async postAdvice(
        @CurrentUser() user: UserPayload,
        @Param( new ZodValidationPipe(createAdviceParamSchema) ) params: CreateAdviceParamSchema,
        @Body( new ZodValidationPipe(createAdviceBodySchema) ) body: CreateAdviceBodySchema )
        
        {
            
            const { description, tier } = body
            const { sub:userId } = user
            const { laboratory_id, sub_event_id } = params

            await this.prisma.advice.create({
                data:{
                    description,
                    tier,
                    laboratory_id, 
                    sub_event_id,
                    created_by: userId,
                }
            })
        }

    @Get('/findAll')
    async getAllAdvice(
        @Query('page', new ZodValidationPipe(pageQueryParamSchema) ) page: PageQueryParamSchema) 
        
        {
        const perPage = 20
        const advice = await this.prisma.advice.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: { date_created: "desc" }
        })
    
            return { advice }
        }
}