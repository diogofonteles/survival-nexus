import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SurvivorsRepository } from 'src/domain/survivor/application/repositories/survivors-repository';
import { PrismaSurvivorsRepository } from './prisma/repositories/prisma-survivors-repository';
import { InventoryRepository } from 'src/domain/survivor/application/repositories/inventory-repository';
import { PrismaInventoryRepository } from './prisma/repositories/prisma-inventory-repository';
import { ReportSurvivorsRepository } from 'src/domain/survivor/application/repositories/report-survivors-repository';
import { PrismaReportSurvivorsRepository } from './prisma/repositories/prisma-report-survivors-repository';
import { ReportInventoryRepository } from 'src/domain/survivor/application/repositories/report-inventory-repository';
import { PrismaReportInventoryRepository } from './prisma/repositories/prisma-report-inventory-repository';

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
    {
      provide: ReportSurvivorsRepository,
      useClass: PrismaReportSurvivorsRepository,
    },
    {
      provide: ReportInventoryRepository,
      useClass: PrismaReportInventoryRepository,
    },
  ],
  exports: [
    PrismaService,
    SurvivorsRepository,
    InventoryRepository,
    ReportSurvivorsRepository,
    ReportInventoryRepository,
  ],
})
export class DatabaseModule {}
