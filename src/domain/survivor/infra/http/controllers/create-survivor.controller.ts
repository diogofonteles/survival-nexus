import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateSurvivorUseCase } from 'src/domain/survivor/application/use-cases/create-survivor.use-case';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { hash } from 'bcryptjs';

const createSurvivorBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
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
  constructor(
    private createSurvivor: CreateSurvivorUseCase,
    private prisma: PrismaService,
  ) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateSurvivorBodySchema) {
    const { name, email, password, age, gender, lastLocation, infected } = body;

    const userWithSameEmail = await this.prisma.survivor.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('User already exists.');
    }

    const hashedPassword = await hash(password, 8);
    const result = await this.createSurvivor.execute({
      name,
      email,
      password: hashedPassword,
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
