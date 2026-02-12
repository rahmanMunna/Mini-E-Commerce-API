/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/entities/customer.entity";
import { ShippingAddress } from "src/entities/shippingAddress.entity";
import { User } from "src/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { CreateAdminDto, CreateCustomerDto, LoginDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { IPayload } from "src/interfaces/payload.interface";


@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Customer) private customerRepo: Repository<Customer>,
        @InjectRepository(ShippingAddress) private shippingAddressRepo: Repository<ShippingAddress>,
        private readonly jwtService: JwtService,
    ) {}    

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async createUser(email: string, password: string, role: string): Promise<User> {
        const hashedPassword = await this.hashPassword(password);

        const user = this.userRepo.create({
            email,
            password: hashedPassword,
            role: role,
        });
        await this.userRepo.save(user);

        return user;
    }

    async registerCustomer(dto: CreateCustomerDto) : Promise<{message: string}> {
        const {
            name,
            phone,
            email,
            password,
            city,
            location,
            details
        } = dto;

        //findExisting user
        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create User
        const user = await this.createUser(email, password, 'customer');

        // create shipping address
        const shippingAddress = this.shippingAddressRepo.create({
            city,
            location,
            details,
        });
        await this.shippingAddressRepo.save(shippingAddress);


        // Create Customer
        const customer = this.customerRepo.create({
            name: name,
            phone: phone,
            user: user,
            shippingAddress: shippingAddress,
        });
        await this.customerRepo.save(customer);

        return {  message: 'Customer registered successfully'};

        
    }

    async registerAdmin(dto: CreateAdminDto) : Promise<{message: string}> {
        const { email, password } = dto;

        //findExisting user
        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        await this.createUser(email, password, 'admin');

        return { message: 'Admin registered successfully' };
    } 

    async login(dto: LoginDto): Promise<{ access_token: string; userId: string }> {
    const { email, password } = dto;

    const user = await this.findUserByEmail(email);
    
    // Add this check
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token
    const payload : IPayload = { 
        sub: user.userId, 
        email: user.email, 
        role: user.role 
    };
    const token: string = await this.jwtService.signAsync(payload);
    
    return { access_token : token,userId: user.userId };
    
    }
}