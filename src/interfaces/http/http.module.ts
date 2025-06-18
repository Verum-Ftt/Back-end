import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { AuthModule } from '@/interfaces/http/modules/controllers/Auth/auth.module';

@Module({
  imports: [ AuthModule, ModulesModule ],

  providers:[ PrismaService ]
})


export class HttpModule {}