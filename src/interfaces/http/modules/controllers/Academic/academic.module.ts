import { Module } from '@nestjs/common';
import { AcademicController } from './academic.controller';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { ACADEMIC_REPOSITORY } from '@/core/repositories/academic.repository';
import { FindAcademicUseCase } from '@/core/use-cases/academic/find-academic.use-case';
import { CreateAcademicUseCase } from '@/core/use-cases/academic/create-academic.use-case';
import { DeleteAcademicUseCase } from '@/core/use-cases/academic/delete-academic.use-case';
import { UpdateAcademicUseCase } from '@/core/use-cases/academic/update-academic.use-case';
import { PrismaAcademicRepository } from '@/infrastructure/database/prisma/repositories/prisma-academic.repository';


@Module({
  // imports: [DatabaseModule], //Importa o módulo que provê o PrismaService
  
  controllers: [AcademicController],

  providers: [
    CreateAcademicUseCase, 
    FindAcademicUseCase,
    DeleteAcademicUseCase,
    UpdateAcademicUseCase,
    {
      provide: ACADEMIC_REPOSITORY,
      useClass: PrismaAcademicRepository,
    },

    // exports: [FindAcademicUseCase]
  ],
})
export class AcademicModule {}