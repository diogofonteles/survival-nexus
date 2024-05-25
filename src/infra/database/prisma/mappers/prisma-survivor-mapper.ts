import { Survivor as PrismaSurvivor, Prisma } from '@prisma/client';
import { Survivor } from 'src/core/entities/survivor.entity';

export class PrismaSurvivorMapper {
  static toDomain(raw: PrismaSurvivor): Survivor {
    return Survivor.create({
      name: raw.name,
      age: raw.age,
      gender: raw.gender,
      lastLocation: {
        latitude: raw.latitude,
        longitude: raw.longitude,
      },
      infected: raw.infected,
    });
  }

  static toPrisma(survivor: Survivor): Prisma.SurvivorUncheckedCreateInput {
    return {
      id: survivor.id.toString(),
      name: survivor.name,
      age: survivor.age,
      gender: survivor.gender,
      latitude: survivor.lastLocation.latitude,
      longitude: survivor.lastLocation.longitude,
      infected: survivor.infected,
    };
  }
}
