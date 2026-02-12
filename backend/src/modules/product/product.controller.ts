/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Product } from "src/entities/product.entity";

@ApiTags('product')
@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post('add')
    @ApiCreatedResponse({ type: Product })
    async createProduct(@Body() dto: CreateProductDto): Promise<Product> {
        return await this.productService.createProduct(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Products' })
    @ApiCreatedResponse({ type: Product, isArray: true })
    getAllProducts(): Promise<Product[]> {
        return this.productService.getAllProducts();
    }

}