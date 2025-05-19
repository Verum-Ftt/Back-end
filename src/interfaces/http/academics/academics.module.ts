import { envSchema } from '../../../env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from '../../../infrastructure/auth/auth.module';
import { AcademicController } from './academic.controller'
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Module({
  imports: [ ConfigModule.forRoot({ validate: (env) => envSchema.parse(env) }), AuthModule ],
  
  controllers: [ AcademicController ],

  providers:[ PrismaService ]
})


export class AcademicModule {}
