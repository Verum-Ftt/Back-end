import { envSchema } from './env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from './interfaces/auth/auth.module';
import { PrismaService } from './application/prisma/prisma.service';
import { FecthEventController } from './interfaces/http/controllers/fecth-event.controller';
import { CreateEventController } from './interfaces/http/controllers/create-event.controller';
import { AuthenticateController } from './interfaces/http/controllers/authenticate.controller';
import { CreateAcademicControler } from './interfaces/http/controllers/create-academic.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  
  controllers: [
    CreateAcademicControler, 
    AuthenticateController, 
    CreateEventController,
    FecthEventController
  ],

  providers: [PrismaService],
})


export class AppModule {}
