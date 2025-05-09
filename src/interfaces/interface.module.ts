import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './http/event/event.module';
import { AcademicModule } from './http/academics/academics.module';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { LaboratoryModule } from './http/laboratory/laboratory.module';

@Module({
  imports: [  
    AuthModule,
    AcademicModule,
    EventModule,
    LaboratoryModule,
  ],
  

  providers:[ PrismaService ]
})


export class InterfaceModule {}
