import { SurvivorUserEntity } from 'src/core/entities/survivor-user.entity';

export abstract class SurvivorUserRepository {
  abstract findByEmail(email: string): Promise<SurvivorUserEntity | null>;
  abstract create(survivor: SurvivorUserEntity): Promise<void>;
}
