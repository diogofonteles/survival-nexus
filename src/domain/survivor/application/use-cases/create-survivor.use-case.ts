import { Injectable } from '@nestjs/common';
import { Survivor } from 'src/core/entities/survivor.entity';
import { Either, right } from 'src/core/types/either';
import { SurvivorsRepository } from '../repositories/survivors-repository';

interface CreateSurvivorUseCaseRequest {
  name: string;
  age: number;
  gender: string;
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  infected: boolean;
}

type CreateSurvivorUseCaseResponse = Either<
  null,
  {
    survivor: Survivor;
  }
>;

@Injectable()
export class CreateSurvivorUseCase {
  constructor(private survivorsRepository: SurvivorsRepository) {}

  async execute({
    name,
    age,
    gender,
    lastLocation,
    infected,
  }: CreateSurvivorUseCaseRequest): Promise<CreateSurvivorUseCaseResponse> {
    const survivor = await Survivor.create({
      name,
      age,
      gender,
      infected,
      lastLocation,
      createdAt: new Date(),
    });

    await this.survivorsRepository.create(survivor);

    return right({ survivor });
  }
}
