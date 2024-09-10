// src/items/items.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllItems() {
    return this.prisma.item.findMany({
      orderBy: { timestamp: 'desc' }, // Order by newest
    });
  }

  async getItemById(id: number) {
    const item = await this.prisma.item.findFirst({ where: { id } });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async createItem(createItemDto: CreateItemDto, userId: number) {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
        userId, 
      },
    });
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto, userId: number) {
    const item = await this.getItemById(id);
    if (item.userId !== userId) {
      throw new UnauthorizedException('You can only edit items you created');
    }
  
    
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }
  

  async deleteItem(id: number, userId: number) {
    const item = await this.getItemById(id);
    if (item.userId !== userId) {
      throw new UnauthorizedException('You can only delete items you created');
    }

    return this.prisma.item.delete({ where: { id } });
  }
}
