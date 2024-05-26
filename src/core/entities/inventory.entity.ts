import { Entity } from './entity';
import { UniqueEntityID } from './unique-entity-id';

export interface InventoryProps {
  survivorId: string;
  itemId: string;
  quantity: number;
  updatedAt: Date;
}

export class Inventory extends Entity<InventoryProps> {
  get survivorId(): string {
    return this.props.survivorId;
  }

  set survivorId(value: string) {
    this.props.survivorId = value;
    this.touch();
  }

  get itemId(): string {
    return this.props.itemId;
  }

  set itemId(value: string) {
    this.props.itemId = value;
    this.touch();
  }

  get quantity(): number {
    return this.props.quantity;
  }

  set quantity(value: number) {
    this.props.quantity = value;
    this.touch();
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date) {
    this.props.updatedAt = value;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  public static create(props: InventoryProps, id?: UniqueEntityID) {
    const inventory = new Inventory(props, id);

    return inventory;
  }
}
