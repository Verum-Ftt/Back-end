import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ZodValidationPipe } from "@/interfaces/pipes/zod-valitation-pipe";
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { pageQueryParamSchema, PageQueryParamSchema } from "./dtos/fecth-laboratory.dto"
import { createLaboratory, CreateLaboratoryBodySchema } from "./dtos/create-laboratory.dto";

@Controller('/laboratory')
@UseGuards(AuthGuard('jwt'))
export class LaboratoryController{
    constructor( private prisma: PrismaService ) {}

    @Post('/post')
    async postAcademic(
        @Body( new ZodValidationPipe(createLaboratory) ) body: CreateLaboratoryBodySchema ){

        const { local, quantity } = body

        await this.prisma.laboratory.create({
            data:{
                local,
                quantity
            }
        })
    }

        @Get('/get')
        async getAllLaboratory(@Query('page', new ZodValidationPipe(pageQueryParamSchema) ) page: PageQueryParamSchema) {
            const perPage = 20
            const laboratory = await this.prisma.laboratory.findMany({
                take: perPage,
                skip: (page - 1) * perPage,
                orderBy: { local: "desc" } // orderBy: { date_created: "desc" }
            })
    
            return { laboratory }
        }
}