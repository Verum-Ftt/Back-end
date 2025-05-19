import { AuthGuard } from "@nestjs/passport";
import { UserPayload } from "@/infrastructure/auth/jwt.strategy";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ZodValidationPipe } from "@/interfaces/pipes/zod-valitation-pipe";
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../../infrastructure/auth/current-user.decorator";
import { PageQueryParamSchema, pageQueryParamSchema } from "./dtos/fecth-subjective.dto";
import { CreateSubjectivesBodySchema, createSubjectivesBodySchema } from "./dtos/create-subjective.dto";

@Controller('/students-subjectives')
@UseGuards(AuthGuard('jwt'))
export class StudentsSubjectivesController{
    constructor( private prisma: PrismaService ) {}

    @Post('/create')
    async postSubjectives(
        @CurrentUser() user: UserPayload,
        @Body( new ZodValidationPipe(createSubjectivesBodySchema) ) body: CreateSubjectivesBodySchema )
        
        {
            const { season, description, title} = body
            const { sub:userId } = user

            await this.prisma.students_subjectives.create({
                data:{
                    title,
                    description,
                    season,
                    created_by: userId,
                }
            })
        }

    @Get('/findAll')
    async getAllSubjectives(
        @Query('page', new ZodValidationPipe(pageQueryParamSchema) ) page: PageQueryParamSchema) 
        
        {
        const perPage = 20
        const subjectives = await this.prisma.students_subjectives.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: { title: "asc" }
        })
    
            return { subjectives }
        }
}