import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './infra/auth/auth.module';
import { SigninController } from './domain/survivor/infra/http/controllers/signin.controller';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { HttpModule } from './domain/survivor/infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  controllers: [SigninController],
  providers: [PrismaService],
})
export class AppModule {}
