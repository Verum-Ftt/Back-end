import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { ZodValidationPipe } from "src/pipes/zod-valitation-pipe";
import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { AuthenticateBodySchema, authenticateBodySchema } from "src/interfaces/authenticate.interfaces";

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

        const acessToken = this.jwt.sign({ sub: academics.id })

        return {
            acess_token: acessToken,
        }
    }
}