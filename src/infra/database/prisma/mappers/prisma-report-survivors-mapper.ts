import { ReportSurvivors } from 'src/domain/survivor/enterprise/entities/value-objects/report-survivors';
import { PrismaReportSurvivors } from '../repositories/prisma-report-survivors-repository';

export class PrismaReportSurvivorsMapper {
  static toDomain(reportSurvivors: PrismaReportSurvivors): ReportSurvivors {
    return ReportSurvivors.create({
      totalSurvivors: reportSurvivors.totalSurvivors,
      totalHealthy: reportSurvivors.healthy,
      totalInfected: reportSurvivors.infected,
      percentHealthy: reportSurvivors.healthyPercentage,
      percentInfected: reportSurvivors.infectedPercentage,
    });
  }
}
