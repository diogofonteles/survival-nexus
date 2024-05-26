import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SurvivorsRepository } from 'src/domain/survivor/application/repositories/survivors-repository';
import { PrismaSurvivorsRepository } from './prisma/repositories/prisma-survivors-repository';
import { InventoryRepository } from 'src/domain/survivor/application/repositories/inventory-repository';
import { PrismaInventoryRepository } from './prisma/repositories/prisma-inventory-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: SurvivorsRepository,
      useClass: PrismaSurvivorsRepository,
    },
    {
      provide: InventoryRepository,
      useClass: PrismaInventoryRepository,
    },
  ],
  exports: [PrismaService, SurvivorsRepository, InventoryRepository],
})
export class DatabaseModule {}
