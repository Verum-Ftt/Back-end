import { Module } from '@nestjs/common';
import { AdviceController } from './controllers/advice.controller';
import { EventController } from './controllers/event.controller';
import { AuthenticateController } from './controllers/auth.controller';
import { AcademicController } from './controllers/academic.controller';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { SubEventController } from './controllers/sub-event.controller';
import { LaboratoryController } from './controllers/laboratory.controller';
import { StudentsSubjectivesController } from './controllers/students-subjective.controller';
import { AuthModule } from '@/infrastructure/auth/auth.module';

@Module({
  imports: [],

  controllers: [
    AcademicController,
    AdviceController,
    AuthenticateController,
    EventController,
    LaboratoryController,
    StudentsSubjectivesController,
    SubEventController
  ],

  providers:[ PrismaService ]
})


export class ControllerModule {}
