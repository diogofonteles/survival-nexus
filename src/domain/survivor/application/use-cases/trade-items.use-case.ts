import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/types/either';
import { SurvivorsRepository } from '../repositories/survivors-repository';
import { InventoryRepository } from '../repositories/inventory-repository';
import { Inventory } from 'src/core/entities/inventory.entity';

interface TradeItemsUseCaseRequest {
  userId: string;
  survivorRequestedId: string;
  itemId: string;
}

type TradeItemsUseCaseResponse = Either<
  'User not found' | 'Item not found or quantity is less than 1' | null,
  {
    inventory: Inventory;
  }
>;

@Injectable()
export class TradeItemsUseCase {
  constructor(
    private survivorsRepository: SurvivorsRepository,
    private inventoryRepository: InventoryRepository,
  ) {}

  async execute({
    userId,
    survivorRequestedId,
    itemId,
  }: TradeItemsUseCaseRequest): Promise<TradeItemsUseCaseResponse> {
    const survivor = await this.survivorsRepository.findById(userId);
    const survivorRequested =
      await this.survivorsRepository.findById(survivorRequestedId);

    if (!survivor || !survivorRequested) {
      return left('User not found');
    }

    const itemRequested =
      await this.inventoryRepository.findByItemIdAndSurvivorId(
        itemId,
        survivorRequestedId,
      );

    if (!itemRequested || itemRequested.quantity <= 1) {
      return left('Item not found or quantity is less than 1');
    }

    await this.inventoryRepository.saveAndDecrement(itemRequested);

    const userItem = await this.inventoryRepository.findByItemIdAndSurvivorId(
      itemId,
      userId,
    );

    if (userItem) {
      await this.inventoryRepository.saveAndIncrement(userItem);
      return right({ inventory: userItem });
    } else {
      const newInventory = Inventory.create({
        survivorId: userId,
        itemId,
        quantity: 1,
        updatedAt: new Date(),
      });

      await this.inventoryRepository.create(newInventory);

      return right({ inventory: newInventory });
    }
  }
}
