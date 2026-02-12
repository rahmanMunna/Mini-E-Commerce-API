/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class ProductDto{
    @ApiProperty({ example: 'Laptop' })
    name: string;

    @ApiProperty({ example: 1})
    stockQty: number;

    @ApiProperty({ example: 999.99 })
    price: number;

    @ApiProperty({ example: 10, description: 'Discount percentage' })
    discount: number;

    @ApiProperty({ example: 1 })
    categoryId: number;
    
}