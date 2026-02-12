/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";


export class CartDto {
    @ApiProperty({ example: 1 })
    productId: number;

    @ApiProperty({ example: 2 })
    qty: number;
}
