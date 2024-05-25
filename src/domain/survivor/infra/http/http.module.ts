import { Module } from '@nestjs/common';
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module';
import { SigninSurvivorUseCase } from '../../application/use-cases/signin-survivor.use-case';
import { SigninController } from './controllers/signin.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignupController } from './controllers/signup.controller';

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [SignupController, SigninController],
  providers: [SigninSurvivorUseCase],
  exports: [SigninSurvivorUseCase],
})
export class HttpModule {}
