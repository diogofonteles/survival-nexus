import { Optional } from '../types/optional';
import { AggregateRoot } from './aggregate-root';

export interface SurvivorProps {
  name: string;
  age: number;
  gender: string;
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  infected: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export class Survivor extends AggregateRoot<SurvivorProps> {
  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  get age(): number {
    return this.props.age;
  }

  set age(value: number) {
    this.props.age = value;
    this.touch();
  }

  get gender(): string {
    return this.props.gender;
  }

  set gender(value: string) {
    this.props.gender = value;
    this.touch();
  }

  get lastLocation(): { latitude: number; longitude: number } {
    return this.props.lastLocation;
  }

  set lastLocation(value: { latitude: number; longitude: number }) {
    this.props.lastLocation = value;
    this.touch();
  }

  get infected(): boolean {
    return this.props.infected;
  }

  set infected(value: boolean) {
    this.props.infected = value;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<SurvivorProps, 'createdAt'>): Survivor {
    const survivor = new Survivor({
      ...props,
      createdAt: props.createdAt || new Date(),
    });

    return survivor;
  }
}
