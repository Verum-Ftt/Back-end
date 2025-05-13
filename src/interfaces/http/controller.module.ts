import { envSchema } from './env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { FecthEventController } from './controllers/fecth-event.controller';
import { CreateEventController } from './event/create-event.controller';
import { AuthenticateController } from '../auth/authenticate.controller';
import { CreateAcademicControler } from './academics/create-academic.controller';

@Module({
  imports: [ ConfigModule.forRoot({ validate: (env) => envSchema.parse(env) }), AuthModule ],
  
  controllers: [
    CreateAcademicControler, 
    AuthenticateController, 
    CreateEventController,
    FecthEventController
  ],

  providers:[ PrismaService ]
})


export class ControllerModule {}
