import { Survivor as PrismaSurvivor, Prisma } from '@prisma/client';
import { Survivor } from 'src/core/entities/survivor.entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export class PrismaSurvivorMapper {
  static toDomain(raw: PrismaSurvivor): Survivor {
    return Survivor.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        age: raw.age,
        gender: raw.gender,
        lastLocation: {
          latitude: raw.latitude,
          longitude: raw.longitude,
        },
        infected: raw.infected,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(survivor: Survivor): Prisma.SurvivorUncheckedCreateInput {
    return {
      id: survivor.id.toString(),
      email: survivor.email,
      password: survivor.password,
      name: survivor.name,
      age: survivor.age,
      gender: survivor.gender,
      latitude: survivor.lastLocation.latitude,
      longitude: survivor.lastLocation.longitude,
      infected: survivor.infected,
      inventory: {
        create: survivor.inventory.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        })),
      },
    };
  }
}
