import { BadRequestException, Controller, Get } from '@nestjs/common';
import { FetchReportSurvivorsUseCase } from 'src/domain/survivor/application/use-cases/fetch-report-survivors.use-case';

@Controller('/survivors/report')
export class FetchReportSurvivorsReportController {
  constructor(private fetchReportSurvivors: FetchReportSurvivorsUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchReportSurvivors.execute();

    if (result.isLeft()) {
      throw new BadRequestException(result.value);
    }

    return result.value.reportSurvivors;
  }
}
