import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllItems(): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }[]>;
    getItemById(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
    createItem(createItemDto: CreateItemDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
    updateItem(id: number, updateItemDto: UpdateItemDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
    deleteItem(id: number, userId: number): Promise<{
        id: number;
        title: string;
        description: string;
        timestamp: Date;
        userId: number;
        categoryId: number;
    }>;
}
