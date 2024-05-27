import { Injectable } from '@nestjs/common';
import { Survivor } from 'src/domain/survivor/enterprise/entities/survivor.entity';
import { Either, right } from 'src/core/types/either';
import { SurvivorsRepository } from '../repositories/survivors-repository';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface UpdateSurvivorUseCaseRequest {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  infected: boolean;
}

type UpdateSurvivorUseCaseResponse = Either<
  null,
  {
    survivor: Survivor;
  }
>;

@Injectable()
export class UpdateSurvivorUseCase {
  constructor(private survivorsRepository: SurvivorsRepository) {}

  async execute({
    id,
    name,
    email,
    age,
    gender,
    lastLocation,
    infected,
  }: UpdateSurvivorUseCaseRequest): Promise<UpdateSurvivorUseCaseResponse> {
    const survivor = await Survivor.create(
      {
        name,
        email,
        age,
        gender,
        infected,
        lastLocation,
        createdAt: new Date(),
      },
      new UniqueEntityID(id),
    );

    await this.survivorsRepository.save(survivor);

    return right({ survivor });
  }
}
