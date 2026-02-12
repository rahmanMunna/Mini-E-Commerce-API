/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto, CreateCustomerDto, LoginDto } from "./dto";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { User } from "src/entities/user.entity";

@Controller('auth')

export class AuthController{

    constructor(private readonly authService: AuthService) {}

    @Post('/register/customer')
    @ApiCreatedResponse({ type: User })
    async registerCustomer(@Body()dto: CreateCustomerDto) : Promise<{message: string}> {
        return this.authService.registerCustomer(dto);
    }

    @Post('/register/admin')
    @ApiCreatedResponse({ type: User })
    async registerAdmin(@Body()dto: CreateAdminDto) : Promise<{message: string}> {
        return this.authService.registerAdmin(dto);
    }

    @Post('login')
    async login(@Body() dto : LoginDto) : Promise<{access_token: string,userId : string}> {
        return this.authService.login(dto);
    }

}
