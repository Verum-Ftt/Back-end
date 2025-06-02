import { Module } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { AuthModule } from '@/interfaces/http/auth/auth.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ AuthModule, ModulesModule ],

  controllers: [],

  providers:[ PrismaService ]
})


export class HttpModule {}
