import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SurvivorEntity } from 'src/core/entities/survivor.entity';
import { PrismaSurvivorMapper } from '../mappers/prisma-survivor-mapper';
import { SurvivorRepository } from 'src/domain/survivor/application/repositories/survivor-repository';

@Injectable()
export class PrismaSurvivorRepository implements SurvivorRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const survivor = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!survivor) {
      return null;
    }

    return PrismaSurvivorMapper.toDomain(survivor);
  }

  async create(survivor: SurvivorEntity) {
    const data = PrismaSurvivorMapper.toPrisma(survivor);

    await this.prisma.user.create({
      data,
    });
  }
}
