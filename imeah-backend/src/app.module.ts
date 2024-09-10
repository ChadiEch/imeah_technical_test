// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [AuthModule, PrismaModule,CategoriesModule,ItemsModule], // Add modules here
})
export class AppModule {}
