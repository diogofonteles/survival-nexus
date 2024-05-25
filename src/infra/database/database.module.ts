import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SurvivorRepository } from 'src/domain/survivor/application/repositories/survivor-repository';
import { PrismaSurvivorRepository } from './prisma/repositories/prisma-survivor-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: SurvivorRepository,
      useClass: PrismaSurvivorRepository,
    },
  ],
  exports: [PrismaService, SurvivorRepository],
})
export class DatabaseModule {}
