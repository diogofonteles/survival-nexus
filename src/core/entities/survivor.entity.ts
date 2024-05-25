import { Entity } from './entity';
import { UniqueEntityID } from './unique-entity-id';

export interface SurvivorProps {
  name: string;
  email: string;
  password: string;
}

export class SurvivorEntity extends Entity<SurvivorProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  public static create(props: SurvivorProps, id?: UniqueEntityID) {
    const survivor = new SurvivorEntity(props, id);

    return survivor;
  }
}
