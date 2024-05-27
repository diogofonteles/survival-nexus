import { ReportSurvivors } from 'src/domain/survivor/enterprise/entities/value-objects/report-survivors';

export abstract class ReportSurvivorsRepository {
  abstract fetch(): Promise<ReportSurvivors>;
}
