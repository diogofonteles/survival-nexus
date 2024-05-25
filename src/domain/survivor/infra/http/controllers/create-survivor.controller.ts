import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateSurvivorUseCase } from 'src/domain/survivor/application/use-cases/create-survivor.use-case';

const createSurvivorBodySchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.string(),
  lastLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  infected: z.boolean(),
});

const bodyValidationPipe = new ValidationPipe(createSurvivorBodySchema);

type CreateSurvivorBodySchema = z.infer<typeof createSurvivorBodySchema>;

@Controller('/survivors')
export class CreateSurvivorController {
  constructor(private createSurvivor: CreateSurvivorUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateSurvivorBodySchema) {
    const { name, age, gender, lastLocation, infected } = body;

    const result = await this.createSurvivor.execute({
      name,
      age,
      gender,
      lastLocation,
      infected,
    });

    if (result.isLeft()) {
      throw new BadRequestException(result.value);
    }
  }
}
