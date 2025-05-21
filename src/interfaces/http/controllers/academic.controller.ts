import { hash } from "bcryptjs";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ZodValidationPipe } from "@/interfaces/http/pipes/zod-valitation-pipe";
import { Body, ConflictException, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateAcademicBodySchema, createAcademicBodySchema } from "./../dtos/create-academic.dto";

@Controller('/academics')
export class AcademicController{
    constructor(private prisma: PrismaService) {}

    @HttpCode(201)
    @Post('/create')
    async postAcademic(@Body( new ZodValidationPipe( createAcademicBodySchema ) ) body: CreateAcademicBodySchema) {

        const { name, email, phone, RA, password } = body

        const existingAcademic = await this.prisma.academics.findFirst({ 
            where: {
                OR: [ { email }, { phone }, { RA } ]
            }
        })

        if (existingAcademic) {
            if(existingAcademic.email === email){
                throw new ConflictException('Academic with the same e-mail address already exists.')
            }
            if(existingAcademic.phone === phone){
                throw new ConflictException('Academic with the same phone number already exists.')
            }
            if(existingAcademic.RA === RA){
                throw new ConflictException('Academic with the same RA already exists.')
            }
        }

        const hashedPassword = await hash(password, 8)
        await this.prisma.academics.create({
            data: {
                name,
                email,
                phone,
                RA,
                password: hashedPassword
            }
        })
    }
}