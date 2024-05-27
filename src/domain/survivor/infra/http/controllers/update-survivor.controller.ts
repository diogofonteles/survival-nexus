import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Put,
} from '@nestjs/common';
import { z } from 'zod';
import { ValidationPipe } from '../pipes/validation.pipe';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UpdateSurvivorUseCase } from 'src/domain/survivor/application/use-cases/update-survivor.use-case';

const updateSurvivorBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  gender: z.string(),
  lastLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  infected: z.boolean(),
});

const bodyValidationPipe = new ValidationPipe(updateSurvivorBodySchema);

type UpdateSurvivorBodySchema = z.infer<typeof updateSurvivorBodySchema>;

@Controller('/survivors')
export class UpdateSurvivorController {
  constructor(
    private updateSurvivor: UpdateSurvivorUseCase,
    private prisma: PrismaService,
  ) {}

  @Put()
  @HttpCode(204)
  async handle(@Body(bodyValidationPipe) body: UpdateSurvivorBodySchema) {
    const { id, name, email, age, gender, lastLocation, infected } = body;

    const result = await this.updateSurvivor.execute({
      id,
      name,
      email,
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
