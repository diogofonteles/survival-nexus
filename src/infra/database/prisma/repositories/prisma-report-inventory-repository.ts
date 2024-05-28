import { Injectable } from '@nestjs/common';
import { ReportInventoryRepository } from 'src/domain/survivor/application/repositories/report-inventory-repository';
import { PrismaService } from '../prisma.service';
import { ReportInventory } from 'src/domain/survivor/enterprise/entities/value-objects/report-inventory';
import { PrismaReportInventoryMapper } from '../mappers/prisma-report-inventory-mapper';

export type PrismaReportInventory = {
  averageWater: number | null;
  averageFood: number | null;
  averageMedication: number | null;
  averageVacine: number | null;
};

@Injectable()
export class PrismaReportInventoryRepository
  implements ReportInventoryRepository
{
  constructor(private prisma: PrismaService) {}

  async fetch(): Promise<ReportInventory> {
    const averageWater = await this.prisma.inventory.aggregate({
      _avg: {
        quantity: true,
      },
      where: {
        item: {
          type: 'WATER',
        },
      },
    });

    const averageFood = await this.prisma.inventory.aggregate({
      _avg: {
        quantity: true,
      },
      where: {
        item: {
          type: 'FOOD',
        },
      },
    });

    const averageMedication = await this.prisma.inventory.aggregate({
      _avg: {
        quantity: true,
      },
      where: {
        item: {
          type: 'MEDICATION',
        },
      },
    });

    const averageVacine = await this.prisma.inventory.aggregate({
      _avg: {
        quantity: true,
      },
      where: {
        item: {
          type: 'CVIRUS_VACCINE',
        },
      },
    });

    const reportInventory: PrismaReportInventory = {
      averageWater: averageWater._avg.quantity,
      averageFood: averageFood._avg.quantity,
      averageMedication: averageMedication._avg.quantity,
      averageVacine: averageVacine._avg.quantity,
    };

    return PrismaReportInventoryMapper.toDomain(reportInventory);
  }
}
