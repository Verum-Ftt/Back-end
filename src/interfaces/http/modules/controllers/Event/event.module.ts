import { Module } from '@nestjs/common';
import { AuthModule } from '../../Auth/auth.module';
import { EventController } from './event.controller';
import { PipesModule } from '@/interfaces/http/pipes/pipes.module';
import { EVENT_REPOSITORY } from '@/core/repositories/event.repository';
// import { DatabaseModule } from '@/infrastructure/database/database.module';
import { FindEventUseCase } from '@/core/use-cases/event/find-event.use-case';
import { CreateEventUseCase } from '@/core/use-cases/event/create-event.use-case';
import { UpdateEventUseCase } from '@/core/use-cases/event/update-event.use-case';
import { DeleteEventUseCase } from '@/core/use-cases/event/delete-event.use-case';
import { PrismaEventRepository } from '@/infrastructure/database/prisma/repositories/prisma-event.repository';


@Module({
  imports: [AuthModule, PipesModule], // DatabaseModule
  
  controllers: [EventController],

  providers: [
    CreateEventUseCase, 
    FindEventUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase, 
    {
      provide: EVENT_REPOSITORY,
      useClass: PrismaEventRepository,
    },
  ],
})
export class EventModule {}