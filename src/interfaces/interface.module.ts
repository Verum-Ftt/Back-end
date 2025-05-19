import { Module } from '@nestjs/common';
import { EventModule } from './http/event/event.module';
import { AdviceModule } from './http/advice/advice.module';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { SubEventModule } from './http/sub-event/sub-event.module';
import { AcademicModule } from './http/academics/academics.module';
import { LaboratoryModule } from './http/laboratory/laboratory.module';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { StudentsSubjectivesModule } from './http/students-subjective/students-subjective.module';

@Module({
  imports: [  
    AuthModule,
    AcademicModule,
    EventModule,
    LaboratoryModule,
    AdviceModule,
    SubEventModule,
    StudentsSubjectivesModule,
  ],
  

  providers:[ PrismaService ]
})


export class InterfaceModule {}
