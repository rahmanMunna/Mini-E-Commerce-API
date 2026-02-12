/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Customer } from 'src/entities/customer.entity';
import {  Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private customerRepos : Repository<Customer>
    ) {}

        async getByUserId(userId : string) : Promise<Customer> {
            const customer =  await this.customerRepos.findOneBy({userId : userId})
            if(!customer) {
                throw new NotFoundException('Customer not found');
            }
            return customer;
        }

}
