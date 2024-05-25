import { User as PrismaUser, Prisma } from '@prisma/client';
import { SurvivorEntity } from 'src/core/entities/survivor.entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export class PrismaSurvivorMapper {
  static toDomain(raw: PrismaUser): SurvivorEntity {
    if (raw.name === null || raw.email === null || raw.password === null) {
      throw new Error('Invalid data');
    }

    return SurvivorEntity.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(survivor: SurvivorEntity): Prisma.UserUncheckedCreateInput {
    return {
      id: survivor.id.toString(),
      name: survivor.name,
      email: survivor.email,
      password: survivor.password,
    };
  }
}
