import { Module } from '@nestjs/common';
import { envSchema } from '../../../env';
import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from '../auth/auth.module';
import { StudentsSubjectivesController } from './students-subjective.controller'
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Module({
  imports: [ ConfigModule.forRoot({ validate: (env) => envSchema.parse(env) }), AuthModule ],
  
  controllers: [ StudentsSubjectivesController ],

  providers:[ PrismaService ]
})


export class StudentsSubjectivesModule {}
