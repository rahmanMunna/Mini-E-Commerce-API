/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { 
    IsEmail, 
    IsString, 
    MinLength, 
    MaxLength, 
    IsOptional, 
    IsNotEmpty,
    Length,
    IsStrongPassword
} from 'class-validator';

class BaseDto {
    @ApiProperty({ example: 'customer@example.com' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
    @IsStrongPassword()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}

export class CreateCustomerDto extends BaseDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
    name: string;

    @ApiProperty({ example: '0123456789' })
    @IsString({ message: 'Phone must be a string' })
    @IsNotEmpty({ message: 'Phone number is required' })
    @Length(11, 11, { message: 'Phone number must be exactly 11 digits' })
    phone: string;

    @ApiProperty({ example: 'Dhaka' })
    @IsString({ message: 'City must be a string' })
    @IsNotEmpty({ message: 'City is required' })
    @MinLength(2, { message: 'City must be at least 2 characters long' })
    @MaxLength(50, { message: 'City cannot exceed 50 characters' })
    city: string;

    @ApiProperty({ example: 'Gulshan' })
    @IsString({ message: 'Location must be a string' })
    @IsNotEmpty({ message: 'Location is required' })
    @MinLength(2, { message: 'Location must be at least 2 characters long' })
    @MaxLength(50, { message: 'Location cannot exceed 100 characters' })
    location: string;

    @ApiProperty({ example: 'Apartment 101', required: false })
    @IsString({ message: 'Details must be a string' })
    @IsOptional()
    @MaxLength(50, { message: 'Details cannot exceed 50 characters' })
    details?: string;
}

export class CreateAdminDto extends BaseDto {}

export class LoginDto extends BaseDto {}