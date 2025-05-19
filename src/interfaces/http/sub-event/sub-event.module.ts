import { Module } from "@nestjs/common";
import { envSchema } from "../../../env";
import { ConfigModule } from "@nestjs/config"; 
import { SubEventController } from "./sub-event.controller"
import { AuthModule } from '../../../infrastructure/auth/auth.module';
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

@Module({
  imports: [ ConfigModule.forRoot({ validate: (env) => envSchema.parse(env) }), AuthModule ],
  
  controllers: [ SubEventController ],

  providers:[ PrismaService ]
})


export class SubEventModule {}
