/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString, 
    IsNotEmpty, 
    IsNumber, 
    Min, 
    Max, 
    IsPositive, 
    IsInt,
    MinLength,
    MaxLength,
    IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @ApiProperty({ 
        example: 'Wireless Bluetooth Headphones', 
        description: 'Product name' 
    })
    @IsString({ message: 'Product name must be a string' })
    @IsNotEmpty({ message: 'Product name is required' })
    @MinLength(3, { message: 'Product name must be at least 3 characters long' })
    @MaxLength(50, { message: 'Product name cannot exceed 100 characters' })
    name: string;
    
    @ApiProperty({ 
        example: 10, 
        description: 'Available stock quantity',
        minimum: 0,
    })
    @Type(() => Number)
    @IsInt({ message: 'Stock quantity must be an integer' })
    @IsPositive({ message: 'Stock quantity must be a positive number' })
    @Min(0, { message: 'Stock quantity cannot be negative' })
    stockQty: number;
    
    @ApiProperty({ 
        example: 99.99, 
        description: 'Price in BDT',
        minimum: 1,
        maximum: 1000000
    })
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 }, { 
        message: 'Price must be a number with maximum 2 decimal places' 
    })
    @IsPositive({ message: 'Price must be a positive number' })
    @Min(1, { message: 'Price must be at least 1 BDT' })
    price: number;

    @ApiProperty({ 
        example: 10, 
        description: 'Discount in percentage',
        minimum: 0,
        maximum: 100,
        default: 0
    })
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Discount must be a number' })
    @Min(0, { message: 'Discount cannot be negative' })
    @Max(100, { message: 'Discount cannot exceed 100%' })
    @IsOptional()
    discount: number = 0;

    @ApiProperty({ 
        example: 1, 
        description: 'Category ID',
        minimum: 1
    })
    @Type(() => Number)
    @IsInt({ message: 'Category ID must be an integer' })
    @IsPositive({ message: 'Category ID must be a positive number' })
    @IsNotEmpty({ message: 'Category ID is required' })
    categoryId: number;
}