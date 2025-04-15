import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-valitation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { compare } from "bcryptjs";


const authenticateBodySchema = z.object({
    email: z.string().email(), 
    password: z.string()
}) 

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async handle(@Body() body: AuthenticateBodySchema) {
        const { email, password } = body

        const academics = await this.prisma.academics.findUnique({
            where:{
                email
            }
        })

        if(!academics){
            throw new UnauthorizedException('User credentials do not match')
        }

        const isPasswordValid = await compare(password, academics.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('User credentials do not match')
        }

        const acessToken = this.jwt.sign({ sub: 'user-id' })

        return {
            acess_token: acessToken,
        }
    }
}