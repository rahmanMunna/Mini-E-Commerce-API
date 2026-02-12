/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";

class BaseDto {
    @ApiProperty({example: 'customer@example.com'})
    email: string;
    @ApiProperty({example: 'password123'})
    password: string;
}

export class CreateCustomerDto extends BaseDto {
    @ApiProperty({example: 'John Doe'})
    name: string;

    @ApiProperty({example: '0123456789'})
    phone: string;  

    @ApiProperty({example: 'Dhaka'})
    city: string;

    @ApiProperty({example: 'Gulshan'})
    location: string;

    @ApiProperty({example: 'Apartment 101'})
    details?: string;
}

export class CreateAdminDto extends BaseDto {}

export class LoginDto extends BaseDto {}    

