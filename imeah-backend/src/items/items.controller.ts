import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService,private readonly prisma: PrismaService) {}
  

  @Get('/categories')
  async getAllCategories() {
  return this.prisma.category.findMany();
}
 
  @Post('/create')
  async createItem(@Body() createItemDto: CreateItemDto, @Req() req: Request) {
    const userId = req.headers['user-id']; 
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.itemsService.createItem(createItemDto, +userId);
  }

  // Update an item (only the creator can update)
  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @Req() req: Request,
  ) {
    const userId = req.headers['user-id']; // Extract user ID from request headers or other method
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.itemsService.updateItem(+id, updateItemDto, +userId);
  }

  // Delete an item (only the creator can delete)
  @Delete(':id')
  async deleteItem(@Param('id') id: string, @Req() req: Request) {
    const userId = req.headers['user-id']; // Extract user ID from request headers or other method
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.itemsService.deleteItem(+id, +userId);
  }

  // Get all items
  @Get()
  getAllItems() {
    return this.itemsService.getAllItems();
  }

  // Get single item by ID
  @Get(':id')
  getItemById(@Param('id') id: string) {
    return this.itemsService.getItemById(+id);
  }
}
