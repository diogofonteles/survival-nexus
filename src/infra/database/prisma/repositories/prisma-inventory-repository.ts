import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Inventory } from 'src/core/entities/inventory.entity';
import { InventoryRepository } from 'src/domain/survivor/application/repositories/inventory-repository';
import { PrismaInventoryMapper } from '../mappers/prisma-inventory-mapper';

@Injectable()
export class PrismaInventoryRepository implements InventoryRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Inventory | null> {
    const inventory = await this.prisma.inventory.findUnique({
      where: {
        id,
      },
    });

    if (!inventory) {
      return null;
    }

    return PrismaInventoryMapper.toDomain(inventory);
  }

  async findBySurvivorId(survivorId: string): Promise<Inventory[]> {
    const inventories = await this.prisma.inventory.findMany({
      where: {
        survivorId: survivorId,
      },
    });

    return inventories.map(PrismaInventoryMapper.toDomain);
  }

  async findByItemIdAndSurvivorId(
    itemId: string,
    survivorId: string,
  ): Promise<Inventory | null> {
    const inventory = await this.prisma.inventory.findFirst({
      where: {
        itemId,
        survivorId,
      },
    });

    if (!inventory) {
      return null;
    }

    return PrismaInventoryMapper.toDomain(inventory);
  }

  async create(inventory: Inventory): Promise<void> {
    const data = PrismaInventoryMapper.toPrisma(inventory);

    await this.prisma.inventory.create({ data });
  }

  async save(inventory: Inventory): Promise<void> {
    const data = PrismaInventoryMapper.toPrisma(inventory);

    await this.prisma.inventory.update({
      where: {
        id: inventory.id.toString(),
      },
      data,
    });
  }

  async saveAndDecrement(inventory: Inventory): Promise<void> {
    await this.prisma.inventory.update({
      where: {
        id: inventory.id.toString(),
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }

  async saveAndIncrement(inventory: Inventory): Promise<void> {
    await this.prisma.inventory.update({
      where: {
        id: inventory.id.toString(),
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  }
}
