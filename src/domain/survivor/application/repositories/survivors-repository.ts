import { Survivor } from 'src/domain/survivor/enterprise/entities/survivor.entity';

export abstract class SurvivorsRepository {
  abstract fetch(page: number): Promise<Survivor[]>;
  abstract findById(id: string): Promise<Survivor | null>;
  abstract findByEmail(email: string): Promise<Survivor | null>;
  abstract findByName(name: string): Promise<Survivor | null>;
  abstract create(survivor: Survivor): Promise<void>;
  abstract save(survivor: Survivor): Promise<void>;
  abstract delete(survivor: Survivor): Promise<void>;
}
