import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { DatabaseService } from 'src/infra/database/DatabaseConnection';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

const signupBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type SignupBodySchema = z.infer<typeof signupBodySchema>;

@Controller('/signup')
export class SignupController {
  constructor(private database: DatabaseService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(signupBodySchema))
  async handle(@Body() body: SignupBodySchema) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.database.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('User already exists.');
    }

    const hashedPassword = await hash(password, 8);

    await this.database.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
