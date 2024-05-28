import { ReportInventory } from 'src/domain/survivor/enterprise/entities/value-objects/report-inventory';
import { PrismaReportInventory } from '../repositories/prisma-report-inventory-repository';

export class PrismaReportInventoryMapper {
  static toDomain(reportInventory: PrismaReportInventory): ReportInventory {
    return ReportInventory.create({
      averageWater: reportInventory.averageWater || 0,
      averageFood: reportInventory.averageFood || 0,
      averageMedication: reportInventory.averageMedication || 0,
      averageVacine: reportInventory.averageVacine || 0,
    });
  }
}
