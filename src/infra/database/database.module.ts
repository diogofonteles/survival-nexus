import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SurvivorsRepository } from 'src/domain/survivor/application/repositories/survivors-repository';
import { PrismaSurvivorsRepository } from './prisma/repositories/prisma-survivors-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: SurvivorsRepository,
      useClass: PrismaSurvivorsRepository,
    },
  ],
  exports: [PrismaService, SurvivorsRepository],
})
export class DatabaseModule {}
