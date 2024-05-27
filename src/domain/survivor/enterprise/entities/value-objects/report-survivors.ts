import { ValueObject } from '../../../../../core/entities/value-object';

export interface ReportSurvivorsProps {
  totalSurvivors: number;
  totalInfected: number;
  totalHealthy: number;
  percentInfected: number;
  percentHealthy: number;
}

export class ReportSurvivors extends ValueObject<ReportSurvivorsProps> {
  get totalSurvivors(): number {
    return this.props.totalSurvivors;
  }

  get totalInfected(): number {
    return this.props.totalInfected;
  }

  get totalHealthy(): number {
    return this.props.totalHealthy;
  }

  get percentInfected(): number {
    return this.props.percentInfected;
  }

  get percentHealthy(): number {
    return this.props.percentHealthy;
  }

  public static create(props: ReportSurvivorsProps) {
    return new ReportSurvivors(props);
  }
}
