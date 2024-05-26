import { Inventory } from 'src/core/entities/inventory.entity';

export abstract class InventoryRepository {
  abstract findById(id: string): Promise<Inventory | null>;
  abstract findBySurvivorId(survivorId: string): Promise<Inventory[]>;
  abstract findByItemIdAndSurvivorId(
    itemId: string,
    survivorId: string,
  ): Promise<Inventory | null>;
  abstract create(inventory: Inventory): Promise<void>;
  abstract save(inventory: Inventory): Promise<void>;
  abstract saveAndDecrement(inventory: Inventory): Promise<void>;
  abstract saveAndIncrement(inventory: Inventory): Promise<void>;
}
