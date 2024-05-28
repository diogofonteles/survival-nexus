import { BadRequestException, Controller, Get } from '@nestjs/common';
import { FetchReportInventoryUseCase } from 'src/domain/survivor/application/use-cases/fetch-report-inventory.use-case';

@Controller('/inventory/report')
export class FetchReportInventoryController {
  constructor(private fetchReportInventory: FetchReportInventoryUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchReportInventory.execute();

    if (result.isLeft()) {
      throw new BadRequestException(result.value);
    }

    return result.value.reportInventory;
  }
}
