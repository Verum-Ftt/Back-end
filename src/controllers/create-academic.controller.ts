import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-valitation-pipe";

const createAcademicBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.number(),
    RA: z.number(),
    password: z.string()
}) // criar como uma interface

type CreateAcademicBodySchema = z.infer<typeof createAcademicBodySchema>

@Controller('/academics')
export class CreateAcademicControler{
    constructor(private prisma: PrismaService) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAcademicBodySchema))
    async handle(@Body() body: CreateAcademicBodySchema) {
        const {name, email, phone, RA, password} = body

        const userWithSameEmail = await this.prisma.academics.findUnique({
            where: {
                email,
            }
        })

        if (userWithSameEmail) {
            throw new ConflictException('Academic with the same e-mail address already exists.')
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