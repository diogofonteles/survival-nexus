import { Injectable } from '@nestjs/common';
import { ReportSurvivors } from 'src/domain/survivor/enterprise/entities/value-objects/report-survivors';
import { Either, right } from 'src/core/types/either';
import { ReportSurvivorsRepository } from '../repositories/report-survivors-repository';

type FetchReportSurvivorsUseCaseResponse = Either<
  null,
  {
    reportSurvivors: ReportSurvivors;
  }
>;

@Injectable()
export class FetchReportSurvivorsUseCase {
  constructor(private reportSurvivorsRepository: ReportSurvivorsRepository) {}

  async execute(): Promise<FetchReportSurvivorsUseCaseResponse> {
    const reportSurvivors = await this.reportSurvivorsRepository.fetch();

    return right({ reportSurvivors });
  }
}
