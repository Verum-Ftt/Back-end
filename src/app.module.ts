import { envSchema } from './env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { FecthEventController } from './controllers/fecth-event.controller';
import { CreateEventController } from './controllers/create-event.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAcademicControler } from './controllers/create-academic.controller';

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
