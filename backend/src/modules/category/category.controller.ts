/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('add')
    @Roles(['admin'])
    @UsePipes(new ValidationPipe)
    @UseGuards(AuthGuard,RolesGuard)   
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Category })
    async createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(dto);
    }

    @Get()
    @Roles(['admin'])
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Category, isArray: true })
    getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    @Roles(['admin'])
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Category })
    getCategoryById(@Param('id') id: number): Promise<Category> {
        return this.categoryService.getCategoryById(id);
    }
}
