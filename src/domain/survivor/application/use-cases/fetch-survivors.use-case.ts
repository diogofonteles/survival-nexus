import { Injectable } from '@nestjs/common';
import { SurvivorsRepository } from '../repositories/survivors-repository';
import { Survivor } from 'src/domain/survivor/enterprise/entities/survivor.entity';
import { Either, right } from 'src/core/types/either';

interface FetchSurvivorsUseCaseRequest {
  page: number;
}

type FetchSurvivorsUseCaseResponse = Either<
  null,
  {
    survivors: Survivor[];
  }
>;

@Injectable()
export class FetchSurvivorsUseCase {
  constructor(private survivorsRepository: SurvivorsRepository) {}

  async execute({
    page,
  }: FetchSurvivorsUseCaseRequest): Promise<FetchSurvivorsUseCaseResponse> {
    const survivors = await this.survivorsRepository.fetch(page);

    return right({ survivors });
  }
}
