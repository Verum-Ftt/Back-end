import { Env } from "@/env"
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { AuthenticateController } from "./auth.controller";
import { JwtStrategy } from "../../infrastructure/auth/jwt.strategy";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";


@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(config: ConfigService<Env, true>){
                    const privateKey = config.get('JWT_PRIVATE_KEY', {infer: true})
                    const publicKey = config.get('JWT_PUBLIC_KEY', {infer: true})

                return{
                    signOptions: { algorithm: 'RS256' },
                    privateKey: Buffer.from(privateKey,'base64'),
                    publicKey: Buffer.from(publicKey,'base64'),
                }
            }
        }),
    ],

    controllers: [ AuthenticateController ],

    providers: [JwtStrategy, PrismaService]
})


export class AuthModule{}