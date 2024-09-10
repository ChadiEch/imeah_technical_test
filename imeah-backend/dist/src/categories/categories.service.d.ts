import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    getAllCategories(): Promise<{
        id: number;
        name: string;
    }[]>;
}
