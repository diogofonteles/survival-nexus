import { Either, right } from 'src/core/types/either';
import { ReportInventory } from '../../enterprise/entities/value-objects/report-inventory';
import { Injectable } from '@nestjs/common';
import { ReportInventoryRepository } from '../repositories/report-inventory-repository';

type FetchReportInventoryUseCaseResponse = Either<
  null,
  {
    reportInventory: ReportInventory;
  }
>;

@Injectable()
export class FetchReportInventoryUseCase {
  constructor(private reportInventoryRepository: ReportInventoryRepository) {}

  async execute(): Promise<FetchReportInventoryUseCaseResponse> {
    const reportInventory = await this.reportInventoryRepository.fetch();

    return right({ reportInventory });
  }
}
