import { z } from "zod";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "@/prisma/prisma.service";
import { ZodValidationPipe } from "@/pipes/zod-valitation-pipe";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/events')
@UseGuards(AuthGuard('jwt'))
export class FecthEventController{
    constructor( private prisma: PrismaService ) {}

    @Get('/get')
    async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
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