import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { DatabaseService } from 'src/infra/database/DatabaseConnection';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { z } from 'zod';

const signinBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SigninBodySchema = z.infer<typeof signinBodySchema>;

@Controller('/signin')
export class SigninController {
  constructor(
    private database: DatabaseService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(signinBodySchema))
  async handle(@Body() body: SigninBodySchema) {
    const { email, password } = body;

    const user = await this.database.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return {
      access_token: accessToken,
    };
  }
}
