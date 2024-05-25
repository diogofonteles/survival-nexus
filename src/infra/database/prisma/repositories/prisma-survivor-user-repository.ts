import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SurvivorUserEntity } from 'src/core/entities/survivor-user.entity';
import { PrismaSurvivorUserMapper } from '../mappers/prisma-survivor-user-mapper';
import { SurvivorUserRepository } from 'src/domain/survivor/application/repositories/survivor-user-repository';

@Injectable()
export class PrismaSurvivorUserRepository implements SurvivorUserRepository {
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

    return PrismaSurvivorUserMapper.toDomain(survivor);
  }

  async create(survivor: SurvivorUserEntity) {
    const data = PrismaSurvivorUserMapper.toPrisma(survivor);

    await this.prisma.user.create({
      data,
    });
  }
}
