import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface SurvivorUserProps {
  name: string;
  email: string;
  password: string;
}

export class SurvivorUserEntity extends Entity<SurvivorUserProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  public static create(props: SurvivorUserProps, id?: UniqueEntityID) {
    const survivor = new SurvivorUserEntity(props, id);

    return survivor;
  }
}
