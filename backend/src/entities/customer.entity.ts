/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ShippingAddress } from "./shippingAddress.entity";


@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, type: 'varchar' })
    name: string;

    @Column({ length: 11, type: 'varchar' })
    phone: string;

    @Column({ name: 'user_id' }) 
    userId: string;

    @OneToOne(()=>User)
    @JoinColumn({name : 'user_id'})
    user : User

    @OneToOne(()=>ShippingAddress)
    @JoinColumn({name : 'shipping_address_id'})
    shippingAddress : ShippingAddress
    
}