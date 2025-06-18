import { Module } from '@nestjs/common';
import { EventModule } from './controllers/Event/event.module';
import { AuthModule } from '@/interfaces/http/modules/Auth/auth.module';
import { AcademicModule } from './controllers/Academic/academic.module';

@Module({
  imports: [
    AuthModule, 
    AcademicModule,
    EventModule
  ],

  controllers: [],

  providers: []

})
export class ModulesModule {}
