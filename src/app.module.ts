import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
// import { AuthModule } from './infrastructure/auth/auth.module';
import { InterfaceModule } from './interfaces/interface.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: (env) => envSchema.parse(env), isGlobal: true }),
    InterfaceModule
  ],
  
  providers: [], 
})


export class AppModule {}
