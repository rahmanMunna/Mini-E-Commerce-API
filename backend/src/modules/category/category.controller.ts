/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('add')
    @ApiCreatedResponse({ type: Category })
    async createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(dto);
    }

    @Get()
    @ApiCreatedResponse({ type: Category, isArray: true })
    getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    @ApiCreatedResponse({ type: Category })
    getCategoryById(@Param('id') id: number): Promise<Category> {
        return this.categoryService.getCategoryById(id);
    }
}
