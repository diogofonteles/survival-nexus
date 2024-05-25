import { Module } from '@nestjs/common';
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module';
import { SigninSurvivorUseCase } from '../../application/use-cases/signin-survivor.use-case';
import { SigninController } from './controllers/signin.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignupController } from './controllers/signup.controller';
import { CreateSurvivorController } from './controllers/create-survivor.controller';
import { CreateSurvivorUseCase } from '../../application/use-cases/create-survivor.use-case';

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [SignupController, SigninController, CreateSurvivorController],
  providers: [SigninSurvivorUseCase, CreateSurvivorUseCase],
  exports: [SigninSurvivorUseCase, CreateSurvivorUseCase],
})
export class HttpModule {}
