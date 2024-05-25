import { SurvivorEntity } from 'src/core/entities/survivor.entity';

export abstract class SurvivorRepository {
  abstract findByEmail(email: string): Promise<SurvivorEntity | null>;
  abstract create(survivor: SurvivorEntity): Promise<void>;
}
