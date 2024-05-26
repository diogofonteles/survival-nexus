import { Survivor } from 'src/core/entities/survivor.entity';

export abstract class SurvivorsRepository {
  abstract findById(id: string): Promise<Survivor | null>;
  abstract findByEmail(email: string): Promise<Survivor | null>;
  abstract findByName(name: string): Promise<Survivor | null>;
  abstract create(survivor: Survivor): Promise<void>;
  abstract save(survivor: Survivor): Promise<void>;
  abstract delete(survivor: Survivor): Promise<void>;
}
