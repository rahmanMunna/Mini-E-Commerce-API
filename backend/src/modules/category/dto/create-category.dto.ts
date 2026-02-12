/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto{
    @ApiProperty({ example: 'Category Name' })
    name: string;
}