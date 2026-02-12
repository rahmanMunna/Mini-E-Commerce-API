/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('shipping_addresses')
export class ShippingAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20 })
    city: string;

    @Column({ type: 'varchar', length: 40 })
    location: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    details?: string;
}