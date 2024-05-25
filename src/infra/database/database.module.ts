import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SurvivorUserRepository } from 'src/domain/survivor/application/repositories/survivor-user-repository';
import { PrismaSurvivorUserRepository } from './prisma/repositories/prisma-survivor-user-repository';
import { SurvivorsRepository } from 'src/domain/survivor/application/repositories/survivors-repository';
import { PrismaSurvivorsRepository } from './prisma/repositories/prisma-survivors-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: SurvivorUserRepository,
      useClass: PrismaSurvivorUserRepository,
    },
    {
      provide: SurvivorsRepository,
      useClass: PrismaSurvivorsRepository,
    },
  ],
  exports: [PrismaService, SurvivorUserRepository, SurvivorsRepository],
})
export class DatabaseModule {}
