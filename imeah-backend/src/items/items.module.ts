// src/items/items.module.ts
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
