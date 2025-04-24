import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";
import { Controller, Get, UseGuards } from "@nestjs/common";

@Controller('/events/get')
@UseGuards(AuthGuard('jwt'))
export class FecthEventController{
    constructor( private prisma: PrismaService ) {}

    @Get()
    async handle() {
        const events = await this.prisma.events.findMany({
            orderBy: {
                date_created: "desc"
            }
        })

        return { events }
    }
}