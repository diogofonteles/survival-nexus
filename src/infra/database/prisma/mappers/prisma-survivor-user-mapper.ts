import { User as PrismaUser, Prisma } from '@prisma/client';
import { SurvivorUserEntity } from 'src/core/entities/survivor-user.entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export class PrismaSurvivorUserMapper {
  static toDomain(raw: PrismaUser): SurvivorUserEntity {
    if (raw.name === null || raw.email === null || raw.password === null) {
      throw new Error('Invalid data');
    }

    return SurvivorUserEntity.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    survivor: SurvivorUserEntity,
  ): Prisma.UserUncheckedCreateInput {
    return {
      id: survivor.id.toString(),
      name: survivor.name,
      email: survivor.email,
      password: survivor.password,
    };
  }
}
