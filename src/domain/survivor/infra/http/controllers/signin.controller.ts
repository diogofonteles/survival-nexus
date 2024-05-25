import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Public } from 'src/infra/auth/public';
import { SigninSurvivorUseCase } from 'src/domain/survivor/application/use-cases/signin-survivor.use-case';
import { WrongCredentialsError } from 'src/domain/survivor/application/use-cases/errors/wrong-credentials-error';

const signinBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SigninBodySchema = z.infer<typeof signinBodySchema>;

@Controller('/signin')
@Public()
export class SigninController {
  constructor(private signinSurvivor: SigninSurvivorUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe(signinBodySchema))
  async handle(@Body() body: SigninBodySchema) {
    const { email, password } = body;

    const result = await this.signinSurvivor.execute({ email, password });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const accessToken = result.value;

    return {
      access_token: accessToken,
    };
  }
}
