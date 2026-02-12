/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/entities/customer.entity";
import { ShippingAddress } from "src/entities/shippingAddress.entity";
import { User } from "src/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User,Customer,ShippingAddress])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports : [AuthService],
})
export class AuthModule { }