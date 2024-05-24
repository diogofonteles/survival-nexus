import { Module } from '@nestjs/common';
import { DatabaseService } from './infra/database/DatabaseConnection';
import { SignupController } from './auth/controllers/signup.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { SigninController } from './auth/controllers/signin.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [SignupController, SigninController],
  providers: [DatabaseService],
})
export class AppModule {}
