import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ItemsController {
    private readonly itemsService;
    private readonly prisma;
    constructor(itemsService: ItemsService, prisma: PrismaService);
    getAllCategories(): Promise<{
        id: number;
        name: string;
    }[]>;
    createItem(createItemDto: CreateItemDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
    updateItem(id: string, updateItemDto: UpdateItemDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
    deleteItem(id: string, req: Request): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
    getAllItems(): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }[]>;
    getItemById(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
}
