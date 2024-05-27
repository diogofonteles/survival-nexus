import { ItemInventorySurvivor } from '../types/item-inventory-survivor';
import { Optional } from '../types/optional';
import { Entity } from './entity';
import { UniqueEntityID } from './unique-entity-id';

export interface SurvivorProps {
  id?: UniqueEntityID | string;
  name: string;
  email: string;
  password?: string;
  age: number;
  gender: string;
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  infected: boolean;
  createdAt: Date;
  updatedAt?: Date;
  inventory?: ItemInventorySurvivor[];
}

export class Survivor extends Entity<SurvivorProps> {
  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
    this.touch();
  }

  get password(): string {
    if (this.props.password) {
      return this.props.password;
    }
    return '';
  }

  set password(value: string) {
    this.props.password = value;
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

  get inventory(): ItemInventorySurvivor[] {
    return this.props.inventory || [];
  }

  set inventory(value: ItemInventorySurvivor[]) {
    this.props.inventory = value;
    this.touch();
  }

  set itemInventory(item: ItemInventorySurvivor) {
    this.props.inventory = [...this.inventory, item];
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<SurvivorProps, 'createdAt' | 'password'>,
    id?: UniqueEntityID,
  ): Survivor {
    const survivor = new Survivor(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
      },
      id,
    );

    return survivor;
  }
}
