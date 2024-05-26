import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SurvivorsRepository } from 'src/domain/survivor/application/repositories/survivors-repository';
import { Survivor } from 'src/core/entities/survivor.entity';
import { PrismaSurvivorMapper } from '../mappers/prisma-survivor-mapper';

@Injectable()
export class PrismaSurvivorsRepository implements SurvivorsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Survivor | null> {
    const survivor = await this.prisma.survivor.findUnique({
      where: {
        id,
      },
    });

    if (!survivor) {
      return null;
    }

    return PrismaSurvivorMapper.toDomain(survivor);
  }

  async findByEmail(email: string): Promise<Survivor | null> {
    const survivor = await this.prisma.survivor.findFirst({
      where: {
        email,
      },
    });

    if (!survivor) {
      return null;
    }

    return PrismaSurvivorMapper.toDomain(survivor);
  }

  async findByName(name: string): Promise<Survivor | null> {
    const survivor = await this.prisma.survivor.findFirst({
      where: {
        name,
      },
    });

    if (!survivor) {
      return null;
    }

    return PrismaSurvivorMapper.toDomain(survivor);
  }

  async fetch(page: number): Promise<Survivor[]> {
    const survivors = await this.prisma.survivor.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });

    return survivors.map(PrismaSurvivorMapper.toDomain);
  }

  async create(survivor: Survivor): Promise<void> {
    const data = PrismaSurvivorMapper.toPrisma(survivor);

    await this.prisma.survivor.create({
      data,
    });
  }

  async save(survivor: Survivor): Promise<void> {
    const data = PrismaSurvivorMapper.toPrisma(survivor);

    await this.prisma.survivor.update({
      where: {
        id: survivor.id.toString(),
      },
      data,
    });
  }

  async delete(survivor: Survivor): Promise<void> {
    await this.prisma.survivor.delete({
      where: {
        id: survivor.id.toString(),
      },
    });
  }
}
