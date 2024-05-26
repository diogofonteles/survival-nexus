import { Module } from '@nestjs/common';
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module';
import { SigninSurvivorUseCase } from '../../application/use-cases/signin-survivor.use-case';
import { SigninController } from './controllers/signin.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateSurvivorController } from './controllers/create-survivor.controller';
import { CreateSurvivorUseCase } from '../../application/use-cases/create-survivor.use-case';
import { TradeItemsController } from './controllers/trade-items.controller';
import { TradeItemsUseCase } from '../../application/use-cases/trade-items.use-case';

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [
    SigninController,
    CreateSurvivorController,
    TradeItemsController,
  ],
  providers: [SigninSurvivorUseCase, CreateSurvivorUseCase, TradeItemsUseCase],
  exports: [SigninSurvivorUseCase, CreateSurvivorUseCase, TradeItemsUseCase],
})
export class HttpModule {}
