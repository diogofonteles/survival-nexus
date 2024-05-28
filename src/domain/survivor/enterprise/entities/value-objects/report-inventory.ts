import { ValueObject } from 'src/core/entities/value-object';

export interface ReportInventoryProps {
  averageWater: number;
  averageFood: number;
  averageMedication: number;
  averageVacine: number;
}

export class ReportInventory extends ValueObject<ReportInventoryProps> {
  get averageWater(): number {
    return this.props.averageWater;
  }

  get averageFood(): number {
    return this.props.averageFood;
  }

  get averageMedication(): number {
    return this.props.averageMedication;
  }

  get averageVacine(): number {
    return this.props.averageVacine;
  }

  public static create(props: ReportInventoryProps) {
    return new ReportInventory(props);
  }
}
