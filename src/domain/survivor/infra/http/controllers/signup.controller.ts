import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { z } from 'zod';
import { ValidationPipe } from '../pipes/validation.pipe';

const signupBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type SignupBodySchema = z.infer<typeof signupBodySchema>;

@Controller('/signup')
export class SignupController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe(signupBodySchema))
  async handle(@Body() body: SignupBodySchema) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('User already exists.');
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
