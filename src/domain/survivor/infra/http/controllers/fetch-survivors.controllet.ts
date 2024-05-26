import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { z } from 'zod';
import { ValidationPipe } from '../pipes/validation.pipe';
import { FetchSurvivorsUseCase } from 'src/domain/survivor/application/use-cases/fetch-survivors.use-case';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/survivors/list')
export class FetchSurvivorsController {
  constructor(private fetchSurvivors: FetchSurvivorsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchSurvivors.execute({ page });

    if (result.isLeft()) {
      throw new BadRequestException(result.value);
    }

    return result.value.survivors;
  }
}
