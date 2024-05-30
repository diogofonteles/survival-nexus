import { Either, left, right } from 'src/core/types/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { SurvivorsRepository } from '../repositories/survivors-repository';

interface SigninSurvivorUseCaseRequest {
  email: string;
  password: string;
}

type SigninSurvivorUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
    name: string;
  }
>;

@Injectable()
export class SigninSurvivorUseCase {
  constructor(
    private survivorRepository: SurvivorsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: SigninSurvivorUseCaseRequest): Promise<SigninSurvivorUseCaseResponse> {
    const survivor = await this.survivorRepository.findByEmail(email);

    if (!survivor) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      survivor.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: survivor.id.toString(),
    });

    const name = survivor.name;

    return right({
      accessToken,
      name,
    });
  }
}
