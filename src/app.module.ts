import { envSchema } from './env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ControllerModule } from './interfaces/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: (env) => envSchema.parse(env), isGlobal: true }),
    ControllerModule,
    AuthModule
  ],
  
  providers: [], 
})


export class AppModule {}
