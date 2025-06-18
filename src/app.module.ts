import { envSchema } from './env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './interfaces/http/http.module';
import { AuthModule } from './interfaces/http/modules/controllers/Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: (env) => envSchema.parse(env), isGlobal: true }),
    HttpModule,
    AuthModule
  ],
  
  providers: [], 
})


export class AppModule {}
