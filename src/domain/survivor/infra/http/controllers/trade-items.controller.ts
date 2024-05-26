import { z } from 'zod';
import { ValidationPipe } from '../pipes/validation.pipe';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { TradeItemsUseCase } from 'src/domain/survivor/application/use-cases/trade-items.use-case';

const tradeItemsBodySchema = z.object({
  userId: z.string(),
  survivorRequestedId: z.string(),
  itemId: z.string(),
});

const bodyValidationPipe = new ValidationPipe(tradeItemsBodySchema);

type TradeItemsBodySchema = z.infer<typeof tradeItemsBodySchema>;

@Controller('/trade-items')
export class TradeItemsController {
  constructor(private tradeItems: TradeItemsUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: TradeItemsBodySchema) {
    const { userId, survivorRequestedId, itemId } = body;

    const result = await this.tradeItems.execute({
      userId,
      survivorRequestedId,
      itemId,
    });

    if (result.isLeft()) {
      throw new BadRequestException(result.value);
    }

    return result.value;
  }
}
