import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    getAllCategories(): Promise<{
        id: number;
        name: string;
    }[]>;
}
