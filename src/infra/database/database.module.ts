import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SurvivorUserRepository } from 'src/domain/survivor/application/repositories/survivor-user-repository';
import { PrismaSurvivorRepository } from './prisma/repositories/prisma-survivor-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: SurvivorUserRepository,
      useClass: PrismaSurvivorRepository,
    },
  ],
  exports: [PrismaService, SurvivorUserRepository],
})
export class DatabaseModule {}
