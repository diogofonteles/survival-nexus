import { Inventory as PrismaInventory, Prisma } from '@prisma/client';
import { Inventory } from 'src/core/entities/inventory.entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export class PrismaInventoryMapper {
  static toDomain(raw: PrismaInventory): Inventory {
    return Inventory.create(
      {
        survivorId: raw.survivorId,
        itemId: raw.itemId,
        quantity: raw.quantity,
        updatedAt: raw.updatedAt || new Date(),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(inventory: Inventory): Prisma.InventoryUncheckedCreateInput {
    return {
      id: inventory.id.toString(),
      survivorId: inventory.survivorId,
      itemId: inventory.itemId,
      quantity: inventory.quantity,
      updatedAt: inventory.updatedAt,
    };
  }
}
