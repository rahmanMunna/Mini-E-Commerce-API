/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Product Name' })
    name: string;
    
    @ApiProperty({ example: '10' })
    stockQty: number;
    
    @ApiProperty({ example: '100',description: 'Price in BDT' })
    price: number;

    @ApiProperty({ example: '10',description: 'Discount in percentage' })
    discount: number;

    @ApiProperty({ example: '1',description: 'Category ID' })
    categoryId: number;
}