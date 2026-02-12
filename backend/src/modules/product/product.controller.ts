/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiTags } from "@nestjs/swagger";
import { Product } from "src/entities/product.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/role.decorator";
import { RolesGuard } from "src/guards/role.guard";
import { ProductDto } from "src/modules/product/dto/product.dto";


@ApiTags('product')
@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post()
    @UsePipes(new ValidationPipe)
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['admin'])
    @ApiHeader({name: 'x-user-id', required: true,})
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Product })
    async createProduct(@Body() dto: CreateProductDto): Promise<Product> {
        return await this.productService.createProduct(dto);
    }

    @Get()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['admin','customer'])
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Product, isArray: true })
    getAllProducts(): Promise<Product[]> {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['admin','customer'])
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Product })
    getProductById(@Param('id') id: number): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['admin'])
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: Product })
    updateProduct(@Param('id') id: number, @Body() dto: ProductDto): Promise<Product> {
        return this.productService.updateProduct(id, dto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['admin'])
    @ApiBearerAuth()
    deleteProduct(@Param('id') id: number): Promise<{success: boolean, message: string}> {
        return this.productService.deleteProduct(id);
    }

}