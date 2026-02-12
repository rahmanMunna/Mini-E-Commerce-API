/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private repo : Repository<Category>) { }   

    async createCategory(dto : CreateCategoryDto) : Promise<Category> {
        const category = this.repo.create(dto);
        return await this.repo.save(category);
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.repo.find();
    }

    async getCategoryById(id: number): Promise<Category> {
        const category = await this.repo.findOneBy({ id });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;    
    }

}
