import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/application/prisma/prisma.service";
import { ZodValidationPipe } from "@/interfaces/http/pipes/zod-valitation-pipe";
import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { AuthenticateBodySchema, authenticateBodySchema } from "@/interfaces/http/dtos/authenticate.interfaces";

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

        const academics = await this.prisma.academics.findUnique( { where:{ email } } )
        
        if(!academics){
            throw new UnauthorizedException('User credentials do not match')
        }

        const isPasswordValid = await compare(password, academics.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('User credentials do not match')
        }

        const access_token = this.jwt.sign({ sub: academics.id }) // cria o token utilizando o sign passando o sub.id

        return {
            access_token: access_token,
        }
    }
}