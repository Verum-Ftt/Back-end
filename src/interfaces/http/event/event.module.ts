import { Module } from '@nestjs/common';
import { envSchema } from '../../../env';
import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from '../../auth/auth.module';
import { EventController } from './event.controller';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Module({
  imports: [ ConfigModule.forRoot({ validate: (env) => envSchema.parse(env) }), AuthModule ],
  
  controllers: [ EventController ],

  providers:[ PrismaService ]
})


export class EventModule {}
