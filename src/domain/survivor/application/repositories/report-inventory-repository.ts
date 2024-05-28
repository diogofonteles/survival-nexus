import { ReportInventory } from '../../enterprise/entities/value-objects/report-inventory';

export abstract class ReportInventoryRepository {
  abstract fetch(): Promise<ReportInventory>;
}
