import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReportSurvivors } from 'src/domain/survivor/enterprise/entities/value-objects/report-survivors';
import { PrismaReportSurvivorsMapper } from '../mappers/prisma-report-survivors-mapper';
import { ReportSurvivorsRepository } from 'src/domain/survivor/application/repositories/report-survivors-repository';

export type PrismaReportSurvivors = {
  totalSurvivors: number;
  healthy: number;
  infected: number;
  healthyPercentage: number;
  infectedPercentage: number;
};

@Injectable()
export class PrismaReportSurvivorsRepository
  implements ReportSurvivorsRepository
{
  constructor(private prisma: PrismaService) {}

  async fetch(): Promise<ReportSurvivors> {
    const healthy = await this.prisma.survivor.count({
      where: {
        infected: false,
      },
    });

    const infected = await this.prisma.survivor.count({
      where: {
        infected: true,
      },
    });

    const totalSurvivors = await this.prisma.survivor.count();
    const healthyPercentage = (healthy / totalSurvivors) * 100;
    const infectedPercentage = (infected / totalSurvivors) * 100;

    const reportSurvivors: PrismaReportSurvivors = {
      totalSurvivors,
      healthy,
      infected,
      healthyPercentage,
      infectedPercentage,
    };

    return PrismaReportSurvivorsMapper.toDomain(reportSurvivors);
  }
}
