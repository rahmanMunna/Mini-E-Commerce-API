/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { CategoryService } from "../category/category.service";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
    ) { }

    async createProduct(dto: CreateProductDto): Promise<Product> {
        const category = await this.categoryService.getCategoryById(dto.categoryId);
        const product = this.productRepository.create({ ...dto, category });
        return await this.productRepository.save(product);
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        return product;
    }


}